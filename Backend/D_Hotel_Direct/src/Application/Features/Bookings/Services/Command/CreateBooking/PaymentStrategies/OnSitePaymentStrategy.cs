using Application.Features.Bookings.DTOs;
using Application.Features.Bookings.Interfaces.Services.Command.CreateBooking.PaymentStrategies;
using Application.Features.Bookings.Repositories;
using Application.Features.Rooms.Repositories;
using AutoMapper;
using Domain.Consts;
using Domain.Enums.Bookings;
using Domain.Models.Bookings;

namespace Application.Features.Bookings.Services.Command.CreateBooking.PaymentStrategies
{
    public class OnSitePaymentStrategy : IPaymentStrategy
    {
        public PaymentProvider Provider => PaymentProvider.OnSite;

        private readonly IBookingRepository _bookingRepository;
        private readonly IBookingDetailRepository _bookingDetailRepository;
        private readonly IInvoiceRepository _invoiceRepository;
        private readonly IRoomTypeRepository _roomTypeRepository;
        private readonly IApplicationDbContext _context;
        private readonly IMapper _mapper;

        public OnSitePaymentStrategy(
            IBookingRepository bookingRepository,
            IBookingDetailRepository bookingDetailRepository,
            IInvoiceRepository invoiceRepository,
            IRoomTypeRepository roomTypeRepository,
            IApplicationDbContext context,
            IMapper mapper)
        {
            _bookingRepository = bookingRepository;
            _bookingDetailRepository = bookingDetailRepository;
            _invoiceRepository = invoiceRepository;
            _roomTypeRepository = roomTypeRepository;
            _context = context;
            _mapper = mapper;
        }

        public async Task<InvoiceDto> HandleBookingAsync(BookingAggregateDto bookingAggregateDto, Guid? userId)
        {
            await using var transaction = await _context.Database.BeginTransactionAsync();

            try
            {
                // --- Lấy RoomType ---
                var roomType = await _roomTypeRepository.GetByIdAsync(bookingAggregateDto.Booking.RoomTypeId)
                    ?? throw new InvalidOperationException("RoomType không tồn tại.");

                // --- Kiểm tra số phòng ---
                var totalActiveBookings = await _bookingRepository.CountActiveBookingsAsync(roomType.Id);
                if (roomType.Quantity - totalActiveBookings <= 0)
                    throw new InvalidOperationException("No available rooms.");

                // --- Thêm Booking ---
                var bookingEntity = _mapper.Map<Booking>(bookingAggregateDto.Booking);
                if (userId.HasValue) bookingEntity.UserId = userId;
                bookingEntity.Status ??= BookingStatus.Pending;
                await _bookingRepository.AddAsync(bookingEntity);
                await _context.SaveChangesAsync();

                // --- Thêm BookingDetails ---
                decimal detailsTotal = 0;
                foreach (var detailDto in bookingAggregateDto.Details)
                {
                    var detailEntity = _mapper.Map<BookingDetail>(detailDto);
                    detailEntity.BookingId = bookingEntity.Id;
                    detailEntity.TotalPrice = (detailEntity.UnitPrice ?? 0) * (detailEntity.Quantity ?? 0);
                    detailsTotal += detailEntity.TotalPrice ?? 0;
                    await _bookingDetailRepository.AddAsync(detailEntity);
                }
                await _context.SaveChangesAsync();

                // --- Tạo Invoice ---
                var invoice = new Invoice
                {
                    BookingId = bookingEntity.Id,
                    InvoiceNumber = $"INV-{DateTime.UtcNow:yyyyMMddHHmmss}-{Guid.NewGuid().ToString().Substring(0, 6).ToUpper()}",
                    TotalAmount = bookingEntity.RentalPrice + detailsTotal,
                    PaymentMethod = Provider.ToString(),
                    IssuedDate = DateTime.UtcNow,
                    Status = "Pending"
                };

                await _invoiceRepository.AddAsync(invoice);
                await _context.SaveChangesAsync();

                await transaction.CommitAsync();
                return _mapper.Map<InvoiceDto>(invoice);
            }
            catch
            {
                await transaction.RollbackAsync();
                throw;
            }
        }
    }
}
