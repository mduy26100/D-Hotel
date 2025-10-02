using Application.Features.Bookings.DTOs;
using Application.Features.Bookings.Interfaces.Services.Query.Booking.GetAllBookings;

namespace Application.Features.Bookings.Services.Query.Booking.GetAllBookings
{
    public class GetAllBookingsService : IGetAllBookingsService
    {
        public Task<IEnumerable<BookingDto>> GetAllAsync(CancellationToken cancellationToken = default)
        {
            throw new NotImplementedException();
        }
    }
}
