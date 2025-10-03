using Application.Features.Bookings.Interfaces.Services.Command.DeleteBooking;
using Application.Features.Bookings.Repositories;

namespace Application.Features.Bookings.Services.Command.DeleteBooking
{
    public class DeleteBookingService : IDeleteBookingService
    {
        private readonly IBookingRepository _bookingRepository;
        private readonly IBookingDetailRepository _bookingDetailRepository;
        private readonly IInvoiceRepository _invoiceRepository;
        private readonly IApplicationDbContext _context;

        public DeleteBookingService(
            IBookingRepository bookingRepository,
            IBookingDetailRepository bookingDetailRepository,
            IInvoiceRepository invoiceRepository,
            IApplicationDbContext context)
        {
            _bookingRepository = bookingRepository;
            _bookingDetailRepository = bookingDetailRepository;
            _invoiceRepository = invoiceRepository;
            _context = context;
        }

        public async Task DeleteAsync(int bookingId, CancellationToken cancellationToken = default)
        {
            await using var transaction = await _context.Database.BeginTransactionAsync(cancellationToken);

            try
            {
                var details = await _bookingDetailRepository.FindAsync(d => d.BookingId == bookingId, cancellationToken);
                foreach (var detail in details)
                {
                    _bookingDetailRepository.Remove(detail);
                }

                var invoice = await _invoiceRepository.FindOneAsync(i => i.BookingId == bookingId, cancellationToken);
                if (invoice != null)
                {
                    _invoiceRepository.Remove(invoice);
                }

                var booking = await _bookingRepository.GetByIdAsync(bookingId, cancellationToken);
                if (booking != null)
                {
                    _bookingRepository.Remove(booking);
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
    }
}
