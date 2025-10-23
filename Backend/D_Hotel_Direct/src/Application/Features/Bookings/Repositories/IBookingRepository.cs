using Domain.Models.Bookings;

namespace Application.Features.Bookings.Repositories
{
    public interface IBookingRepository : IRepository<Booking>
    {
        Task<int> CountActiveBookingsAsync(
            int roomTypeId,
            CancellationToken cancellationToken = default);
    }
}
