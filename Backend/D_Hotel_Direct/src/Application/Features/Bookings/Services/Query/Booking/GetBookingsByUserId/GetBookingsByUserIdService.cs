using Application.Features.Bookings.DTOs;
using Application.Features.Bookings.Interfaces.Services.Query.Booking.GetBookingsByUserId;
using Application.Features.Bookings.Repositories;
using AutoMapper;

namespace Application.Features.Bookings.Services.Query.Booking.GetBookingsByUserId
{
    public class GetBookingsByUserIdService : IGetBookingsByUserIdService
    {
        private readonly IBookingRepository _bookingRepository;
        private readonly IMapper _mapper;

        public GetBookingsByUserIdService(IBookingRepository bookingRepository
            , IMapper mapper)
        {
            _bookingRepository = bookingRepository;
            _mapper = mapper;
        }

        public async Task<IEnumerable<BookingDto>> GetByUserIdAsync(Guid userId, CancellationToken cancellationToken = default)
        {
            var bookings = await _bookingRepository.FindAsync(h => h.UserId == userId, cancellationToken);
            return _mapper.Map<IEnumerable<BookingDto>>(bookings);
        }
    }
}
