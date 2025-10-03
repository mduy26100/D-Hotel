using Application.Features.Bookings.DTOs;
using Application.Features.Bookings.Interfaces.Services.Command.CreateBooking;
using Application.Features.Bookings.Repositories;
using AutoMapper;
using Domain.Models.Bookings;

namespace Application.Features.Bookings.Services.Command.CreateBooking
{
    public class CreateBookingService : ICreateBookingService
    {
        private readonly IBookingRepository _bookingRepository;
        private readonly IBookingDetailRepository _bookingDetailRepository;
        private readonly IInvoiceRepository _invoiceRepository;
        private readonly IApplicationDbContext _context;
        private readonly IMapper _mapper;

        public CreateBookingService(
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

        public async Task<int> CreateAsync(BookingAggregateDto bookingAggregateDto, CancellationToken cancellationToken = default)
        {
            await using var transaction = await _context.Database.BeginTransactionAsync(cancellationToken);

            try
            {
                var bookingEntity = _mapper.Map<Booking>(bookingAggregateDto.Booking);
                await _bookingRepository.AddAsync(bookingEntity, cancellationToken);
                await _context.SaveChangesAsync(cancellationToken);

                foreach (var detailDto in bookingAggregateDto.Details)
                {
                    var detailEntity = _mapper.Map<BookingDetail>(detailDto);
                    detailEntity.BookingId = bookingEntity.Id;
                    await _bookingDetailRepository.AddAsync(detailEntity, cancellationToken);
                }

                if (bookingAggregateDto.Invoice != null)
                {
                    var invoiceEntity = _mapper.Map<Invoice>(bookingAggregateDto.Invoice);
                    invoiceEntity.BookingId = bookingEntity.Id;
                    await _invoiceRepository.AddAsync(invoiceEntity, cancellationToken);
                }

                await _context.SaveChangesAsync(cancellationToken);
                await transaction.CommitAsync(cancellationToken);

                return bookingEntity.Id;
            }
            catch
            {
                await transaction.RollbackAsync(cancellationToken);
                throw;
            }
        }
    }
}
