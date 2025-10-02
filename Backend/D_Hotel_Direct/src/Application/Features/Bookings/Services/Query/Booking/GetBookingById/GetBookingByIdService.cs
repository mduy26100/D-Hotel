using Application.Features.Bookings.DTOs;
using Application.Features.Bookings.Interfaces.Services.Query.Booking.GetBookingById;

namespace Application.Features.Bookings.Services.Query.Booking.GetBookingById
{
    public class GetBookingByIdService : IGetBookingByIdService
    {
        public Task<BookingDto> GetByIdAsync(int id, CancellationToken cancellationToken = default)
        {
            throw new NotImplementedException();
        }
    }
}
