using Application.Features.Bookings.DTOs;
using Application.Features.Bookings.Interfaces.Services.Command.UpdateBooking;
using Application.Features.Bookings.Repositories;
using AutoMapper;
using BookingDetailEntity = Domain.Models.Bookings.BookingDetail;
using InvoiceEntity = Domain.Models.Bookings.Invoice;

namespace Application.Features.Bookings.Services.Command.UpdateBooking
{
    public class UpdateBookingService : IUpdateBookingService
    {
        private readonly IBookingRepository _bookingRepository;
        private readonly IBookingDetailRepository _bookingDetailRepository;
        private readonly IInvoiceRepository _invoiceRepository;
        private readonly IApplicationDbContext _context;
        private readonly IMapper _mapper;

        public UpdateBookingService(
            IBookingRepository bookingRepository,
            IBookingDetailRepository bookingDetailRepository,
            IInvoiceRepository invoiceRepository,
            IApplicationDbContext context,
            IMapper mapper)
        {
            _bookingRepository = bookingRepository;
            _bookingDetailRepository = bookingDetailRepository;
            _invoiceRepository = invoiceRepository;
            _context = context;
            _mapper = mapper;
        }

        public async Task UpdateAsync(int bookingId, BookingAggregateDto updatedBooking, CancellationToken cancellationToken = default)
        {
            await using var transaction = await _context.Database.BeginTransactionAsync(cancellationToken);

            try
            {
                // --- Lấy Booking ---
                var bookingEntity = await _bookingRepository.GetByIdAsync(bookingId, cancellationToken)
                    ?? throw new Exception($"Booking {bookingId} not found");

                // --- Cập nhật Booking ---
                _mapper.Map(updatedBooking.Booking, bookingEntity);
                _bookingRepository.Update(bookingEntity);

                // --- Xóa BookingDetails cũ ---
                var existingDetails = await _bookingDetailRepository.FindAsync(d => d.BookingId == bookingId, cancellationToken);
                foreach (var detail in existingDetails)
                    _bookingDetailRepository.Remove(detail);

                // --- Thêm BookingDetails mới ---
                foreach (var newDetail in updatedBooking.Details)
                {
                    var entity = _mapper.Map<BookingDetailEntity>(newDetail);
                    entity.BookingId = bookingId;
                    await _bookingDetailRepository.AddAsync(entity, cancellationToken);
                }

                await _context.SaveChangesAsync(cancellationToken);

                // --- Tính lại Invoice ---
                var existingInvoice = await _invoiceRepository.FindOneAsync(i => i.BookingId == bookingId, cancellationToken);
                var totalAmount = updatedBooking.Details.Sum(d => (d.UnitPrice ?? 0) * (d.Quantity ?? 0));

                if (existingInvoice == null)
                {
                    // Tạo Invoice mới
                    var invoiceEntity = new InvoiceEntity
                    {
                        BookingId = bookingId,
                        InvoiceNumber = GenerateInvoiceNumber(),
                        TotalAmount = totalAmount,
                        PaymentMethod = null!, // gắn sau với Strategy
                        IssuedDate = DateTime.UtcNow,
                        Status = "Pending"
                    };
                    await _invoiceRepository.AddAsync(invoiceEntity, cancellationToken);
                }
                else
                {
                    // Cập nhật Invoice hiện tại
                    existingInvoice.TotalAmount = totalAmount;
                    existingInvoice.IssuedDate = DateTime.UtcNow;
                    _invoiceRepository.Update(existingInvoice);
                }

                await _context.SaveChangesAsync(cancellationToken);
                await transaction.CommitAsync(cancellationToken);
            }
            catch
            {
                await transaction.RollbackAsync(cancellationToken);
                throw;
            }
        }

        // --- Helper tạo số Invoice ---
        private string GenerateInvoiceNumber()
        {
            return $"INV-{DateTime.UtcNow:yyyyMMddHHmmss}-{Guid.NewGuid().ToString().Substring(0, 6).ToUpper()}";
        }
    }
}
