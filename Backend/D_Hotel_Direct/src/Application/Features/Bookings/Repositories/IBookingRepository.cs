using Domain.Models.Bookings;

namespace Application.Features.Bookings.Repositories
{
    public interface IBookingRepository : IRepository<Booking>
    {
        Task<int> CountActiveBookingsAsync(
           int roomTypeId,
            DateTime? startDate = null,
            DateTime? endDate = null,
            TimeSpan? checkInTime = null,
            CancellationToken cancellationToken = default);
    }
}
