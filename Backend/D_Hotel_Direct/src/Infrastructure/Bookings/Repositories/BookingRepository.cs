using Application.Features.Bookings.Repositories;
using Infrastructure.Common.Persistence.Base;
using Infrastructure.Data;

namespace Infrastructure.Bookings.Repositories
{
    public class BookingRepository : Repository<Booking>, IBookingRepository
    {
        public BookingRepository(ApplicationDbContext context) : base(context)
        {
        }

        public async Task<int> CountActiveBookingsAsync(
            int roomTypeId,
            CancellationToken cancellationToken = default)
        {
            var activeStatuses = new[] { BookingStatus.Pending, BookingStatus.Confirmed, BookingStatus.CheckedIn };

            return await _context.Bookings
                .Where(b => b.RoomTypeId == roomTypeId && activeStatuses.Contains(b.Status))
                .CountAsync(cancellationToken);
        }

    }
}
