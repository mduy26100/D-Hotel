using Application.Features.Bookings.DTOs;
using Application.Features.Bookings.Interfaces.Services.Query.Booking.GetBookingsByDateRange;

namespace Application.Features.Bookings.Services.Query.Booking.GetBookingsByDateRange
{
    public class GetBookingsByDateRangeService : IGetBookingsByDateRangeService
    {
        public Task<IEnumerable<BookingDto>> GetByDateAsync(DateTime startDate, DateTime endDate, CancellationToken cancellationToken = default)
        {
            throw new NotImplementedException();
        }
    }
}
