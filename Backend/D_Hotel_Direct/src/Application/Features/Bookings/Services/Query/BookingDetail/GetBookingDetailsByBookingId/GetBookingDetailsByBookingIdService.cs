using Application.Features.Bookings.DTOs;
using Application.Features.Bookings.Interfaces.Services.Query.BookingDetail.GetBookingDetailsByBookingId;
using Application.Features.Bookings.Repositories;
using AutoMapper;

namespace Application.Features.Bookings.Services.Query.BookingDetail.GetBookingDetailsByBookingId
{
    public class GetBookingDetailsByBookingIdService : IGetBookingDetailsByBookingIdService
    {
        private readonly IBookingDetailRepository _bookingDetailRepository;
        private readonly IMapper _mapper;

        public GetBookingDetailsByBookingIdService(IBookingDetailRepository bookingDetailRepository
            , IMapper mapper)
        {
            _bookingDetailRepository = bookingDetailRepository;
            _mapper = mapper;
        }

        public async Task<IEnumerable<BookingDetailDto>> GetByBookingIdAsync(int bookingId, CancellationToken cancellationToken = default)
        {
            var bookingDetails = await _bookingDetailRepository.FindAsync(h => h.BookingId == bookingId, cancellationToken);
            return _mapper.Map<IEnumerable<BookingDetailDto>>(bookingDetails);
        }
    }
}
