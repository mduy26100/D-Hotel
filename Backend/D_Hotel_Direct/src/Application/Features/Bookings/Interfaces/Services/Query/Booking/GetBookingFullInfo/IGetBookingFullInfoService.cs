using Application.Features.Bookings.DTOs;

namespace Application.Features.Bookings.Interfaces.Services.Query.Booking.GetBookingFullInfo
{
    public interface IGetBookingFullInfoService
    {
        Task<BookingAggregateDto> GetFullInfoAsync(int bookingId, CancellationToken cancellationToken = default);
    }
}
