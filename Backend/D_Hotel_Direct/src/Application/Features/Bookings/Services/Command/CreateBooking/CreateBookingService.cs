using Application.Features.Bookings.DTOs;
using Application.Features.Bookings.Interfaces.Services.Command.CreateBooking;
using Application.Features.Bookings.Repositories;
using Application.Features.Rooms.Repositories;
using AutoMapper;
using Domain.Models.Bookings;

namespace Application.Features.Bookings.Services.Command.CreateBooking
{
    public class CreateBookingService : ICreateBookingService
    {
        private readonly IBookingRepository _bookingRepository;
        private readonly IBookingDetailRepository _bookingDetailRepository;
        private readonly IInvoiceRepository _invoiceRepository;
        private readonly IRoomTypeRepository _roomTypeRepository;
        private readonly IApplicationDbContext _context;
        private readonly IMapper _mapper;

        public CreateBookingService(
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

        public async Task<BookingDto> CreateAsync(
            BookingAggregateDto bookingAggregateDto,
            CancellationToken cancellationToken = default)
        {
            await using var transaction = await _context.Database.BeginTransactionAsync(cancellationToken);

            try
            {
                // --- Lấy RoomType ---
                var roomTypeId = bookingAggregateDto.Booking.RoomTypeId;
                var roomType = await _roomTypeRepository.GetByIdAsync(roomTypeId, cancellationToken);
                if (roomType == null)
                    throw new InvalidOperationException($"RoomType {roomTypeId} không tồn tại.");

                // --- Kiểm tra số phòng còn trống ---
                var totalActiveBookings = await _bookingRepository.CountActiveBookingsAsync(roomTypeId, cancellationToken);
                var remainingQuantity = roomType.Quantity - totalActiveBookings;

                if (remainingQuantity <= 0)
                {
                    // Trả về FE thông báo còn 0 phòng
                    throw new InvalidOperationException(
                        $"No available rooms for the type '{roomType.Name}' during the selected period.");
                }

                // --- Thêm Booking ---
                var bookingEntity = _mapper.Map<Booking>(bookingAggregateDto.Booking);
                await _bookingRepository.AddAsync(bookingEntity, cancellationToken);
                await _context.SaveChangesAsync(cancellationToken);

                // --- Thêm BookingDetails ---
                decimal detailsTotal = 0;
                foreach (var detailDto in bookingAggregateDto.Details)
                {
                    var detailEntity = _mapper.Map<BookingDetail>(detailDto);
                    detailEntity.BookingId = bookingEntity.Id;

                    decimal unitPrice = detailEntity.UnitPrice ?? 0;
                    int quantity = detailEntity.Quantity ?? 0;
                    detailEntity.TotalPrice = unitPrice * quantity;

                    detailsTotal += detailEntity.TotalPrice ?? 0;
                    await _bookingDetailRepository.AddAsync(detailEntity, cancellationToken);
                }
                await _context.SaveChangesAsync(cancellationToken);

                // --- Tạo Invoice ---
                var totalAmount = bookingAggregateDto.Booking.RentalPrice + detailsTotal;
                var invoiceEntity = new Invoice
                {
                    BookingId = bookingEntity.Id,
                    InvoiceNumber = GenerateInvoiceNumber(),
                    TotalAmount = totalAmount,
                    PaymentMethod = "Pending",
                    IssuedDate = DateTime.UtcNow,
                    Status = "Pending"
                };
                await _invoiceRepository.AddAsync(invoiceEntity, cancellationToken);
                await _context.SaveChangesAsync(cancellationToken);

                await transaction.CommitAsync(cancellationToken);

                var bookingDto = _mapper.Map<BookingDto>(bookingEntity);
                return bookingDto;
            }
            catch (InvalidOperationException ex)
            {
                await transaction.RollbackAsync(cancellationToken);
                // FE sẽ nhận HTTP 400/409 + message để hiển thị alert
                throw new ApplicationException(ex.Message);
            }
            catch
            {
                await transaction.RollbackAsync(cancellationToken);
                throw;
            }
        }
        // --- Helper: Tạo số Invoice ---
        private string GenerateInvoiceNumber()
        {
            return $"INV-{DateTime.UtcNow:yyyyMMddHHmmss}-{Guid.NewGuid().ToString().Substring(0, 6).ToUpper()}";
        }
    }
}
