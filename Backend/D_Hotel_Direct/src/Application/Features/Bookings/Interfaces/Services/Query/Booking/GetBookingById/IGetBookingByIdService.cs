using Application.Features.Bookings.DTOs;

namespace Application.Features.Bookings.Interfaces.Services.Query.Booking.GetBookingById
{
    public interface IGetBookingByIdService
    {
        Task<BookingDto> GetByIdAsync(int id, CancellationToken cancellationToken = default);
    }
}
