using Application.Features.Bookings.DTOs;
using Application.Features.Bookings.Interfaces.Services.Query.Booking.GetBookingFullInfo;
using Application.Features.Bookings.Repositories;
using AutoMapper;

namespace Application.Features.Bookings.Services.Query.Booking.GetBookingFullInfo
{
    public class GetBookingFullInfoService : IGetBookingFullInfoService
    {
        private readonly IBookingRepository _bookingRepository;
        private readonly IBookingDetailRepository _bookingDetailRepository;
        private readonly IInvoiceRepository _invoiceRepository;
        private readonly IMapper _mapper;

        public GetBookingFullInfoService(IBookingRepository bookingRepository
            , IBookingDetailRepository bookingDetailRepository
            , IInvoiceRepository invoiceRepository
            , IMapper mapper)
        {
            _bookingRepository = bookingRepository;
            _bookingDetailRepository = bookingDetailRepository;
            _invoiceRepository = invoiceRepository;
            _mapper = mapper;
        }

        public async Task<BookingInfoDto> GetFullInfoAsync(int bookingId, CancellationToken cancellationToken = default)
        {
            var booking = await _bookingRepository.GetByIdAsync(bookingId, cancellationToken);

            var bookingDetails = await _bookingDetailRepository.FindAsync(h => h.BookingId == bookingId, cancellationToken);

            var invoice = await _invoiceRepository.FindOneAsync(h => h.BookingId == bookingId, cancellationToken);

            return new BookingInfoDto
            {
                Booking = _mapper.Map<BookingDto>(booking),
                Details = _mapper.Map<IEnumerable<BookingDetailDto>>(bookingDetails),
                Invoice = _mapper.Map<InvoiceDto>(invoice)
            };
        }
    }
}
