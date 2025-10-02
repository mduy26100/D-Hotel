using Application.Features.Bookings.DTOs;

namespace Application.Features.Bookings.Interfaces.Services.Query.Booking.GetBookingsByDateRange
{
    public interface IGetBookingsByDateRangeService
    {
        Task<IEnumerable<BookingDto>> GetByDateAsync(DateTime startDate, DateTime endDate, CancellationToken cancellationToken = default);
    }
}
