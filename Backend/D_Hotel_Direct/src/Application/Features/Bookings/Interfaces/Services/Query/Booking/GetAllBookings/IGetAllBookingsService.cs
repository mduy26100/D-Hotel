using Application.Features.Bookings.DTOs;

namespace Application.Features.Bookings.Interfaces.Services.Query.Booking.GetAllBookings
{
    public interface IGetAllBookingsService
    {
        Task<IEnumerable<BookingDto>> GetAllAsync(CancellationToken cancellationToken = default);
    }
}
