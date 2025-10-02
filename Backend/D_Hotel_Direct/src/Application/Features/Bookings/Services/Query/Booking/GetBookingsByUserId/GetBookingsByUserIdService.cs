using Application.Features.Bookings.DTOs;
using Application.Features.Bookings.Interfaces.Services.Query.Booking.GetBookingsByUserId;

namespace Application.Features.Bookings.Services.Query.Booking.GetBookingsByUserId
{
    public class GetBookingsByUserIdService : IGetBookingsByUserIdService
    {
        public Task<IEnumerable<BookingDto>> GetByUserIdAsync(Guid userId, CancellationToken cancellationToken = default)
        {
            throw new NotImplementedException();
        }
    }
}
