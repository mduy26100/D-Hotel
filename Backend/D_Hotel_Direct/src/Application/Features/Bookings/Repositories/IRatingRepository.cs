using Domain.Models.Bookings;

namespace Application.Features.Bookings.Repositories
{
    public interface IRatingRepository : IRepository<Rating>
    {
        Task<bool> HasUserRatedBookingAsync(int bookingId);
        Task<double> GetAverageRatingByHotelIdAsync(int hotelId);
    }
}
