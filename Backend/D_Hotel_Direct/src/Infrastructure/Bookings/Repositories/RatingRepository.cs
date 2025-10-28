using Application.Features.Bookings.Repositories;
using Infrastructure.Common.Persistence.Base;
using Infrastructure.Data;

namespace Infrastructure.Bookings.Repositories
{
    public class RatingRepository : Repository<Rating>, IRatingRepository
    {
        public RatingRepository(ApplicationDbContext context) : base(context)
        {
        }

        public async Task<double> GetAverageRatingByHotelIdAsync(int hotelId)
        {
            var ratings = await _context.Set<Rating>()
                .Where(r => r.HotelId == hotelId)
                .ToListAsync();

            if (!ratings.Any())
                return 0.0;

            return ratings.Average(r => r.RatingValue);
        }

        public async Task<bool> HasUserRatedBookingAsync(int bookingId)
        {
            return await _context.Set<Rating>()
                .AnyAsync(r => r.BookingId == bookingId);
        }
    }
}
