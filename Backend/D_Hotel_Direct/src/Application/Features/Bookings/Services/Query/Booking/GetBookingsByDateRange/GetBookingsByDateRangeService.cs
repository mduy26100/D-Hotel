using Application.Features.Bookings.DTOs;
using Application.Features.Bookings.Interfaces.Services.Query.Booking.GetBookingsByDateRange;
using Application.Features.Bookings.Repositories;
using AutoMapper;

namespace Application.Features.Bookings.Services.Query.Booking.GetBookingsByDateRange
{
    public class GetBookingsByDateRangeService : IGetBookingsByDateRangeService
    {
        private readonly IBookingRepository _bookingRepository;
        private readonly IMapper _mapper;

        public GetBookingsByDateRangeService(IBookingRepository bookingRepository
            , IMapper mapper)
        {
            _bookingRepository = bookingRepository;
            _mapper = mapper;
        }

        public async Task<IEnumerable<BookingDto>> GetByDateAsync(DateTime startDate, DateTime endDate, CancellationToken cancellationToken = default)
        {
            var bookings = await _bookingRepository.FindAsync(
                h => h.CheckInDate >= startDate && h.CheckInDate <= endDate, cancellationToken);

            return _mapper.Map<IEnumerable<BookingDto>>(bookings);
        }
    }
}
