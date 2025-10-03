using Application.Features.Bookings.DTOs;
using Application.Features.Bookings.Repositories;
using AutoMapper;
using BookingDetailEntity = Domain.Models.Bookings.BookingDetail;
using InvoiceEntity = Domain.Models.Bookings.Invoice;

namespace Application.Features.Bookings.Services.Command.UpdateBooking
{
    public class UpdateBookingService
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
                var bookingEntity = await _bookingRepository.GetByIdAsync(bookingId, cancellationToken)
                    ?? throw new Exception($"Booking {bookingId} not found");

                _mapper.Map(updatedBooking.Booking, bookingEntity);
                _bookingRepository.Update(bookingEntity);

                var existingDetails = await _bookingDetailRepository.FindAsync(d => d.BookingId == bookingId, cancellationToken);
                foreach (var detail in existingDetails)
                {
                    _bookingDetailRepository.Remove(detail);
                }

                foreach (var newDetail in updatedBooking.Details)
                {
                    var entity = _mapper.Map<BookingDetailEntity>(newDetail);
                    entity.BookingId = bookingId;
                    await _bookingDetailRepository.AddAsync(entity, cancellationToken);
                }

                var existingInvoice = await _invoiceRepository.FindOneAsync(i => i.BookingId == bookingId, cancellationToken);
                if (updatedBooking.Invoice != null)
                {
                    if (existingInvoice == null)
                    {
                        var invoiceEntity = _mapper.Map<InvoiceEntity>(updatedBooking.Invoice);
                        invoiceEntity.BookingId = bookingId;
                        await _invoiceRepository.AddAsync(invoiceEntity, cancellationToken);
                    }
                    else
                    {
                        _mapper.Map(updatedBooking.Invoice, existingInvoice);
                        _invoiceRepository.Update(existingInvoice);
                    }
                }
                else if (existingInvoice != null)
                {
                    _invoiceRepository.Remove(existingInvoice);
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
