using Application.Features.Bookings.DTOs;

namespace Application.Features.Bookings.Interfaces.Services.Query.Booking.GetBookingsByUserId
{
    public interface IGetBookingsByUserIdService
    {
        Task<IEnumerable<BookingDto>> GetByUserIdAsync(Guid userId, CancellationToken cancellationToken = default);
    }
}
