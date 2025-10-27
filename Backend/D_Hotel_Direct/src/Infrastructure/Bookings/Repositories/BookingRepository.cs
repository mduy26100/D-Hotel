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
    DateTime? startDate = null,
    DateTime? endDate = null,
    TimeSpan? checkInTime = null,
    CancellationToken cancellationToken = default)
        {
            var activeStatuses = new[]
            {
        BookingStatus.Pending,
        BookingStatus.Confirmed,
        BookingStatus.CheckedIn
    };

            // Lọc booking cơ bản trong DB
            var bookings = await _context.Bookings
                .Where(b => b.RoomTypeId == roomTypeId && activeStatuses.Contains(b.Status))
                .ToListAsync(cancellationToken); // ⚠️ Dừng LINQ to SQL ở đây

            // Nếu chưa có ngày => không lọc theo thời gian
            if (!startDate.HasValue || !endDate.HasValue)
                return bookings.Count;

            var startDateTime = startDate.Value.Add(checkInTime ?? TimeSpan.Zero);
            var endDateTime = endDate.Value;

            // Lọc trong bộ nhớ (LINQ to Objects)
            var totalActive = bookings.Count(b =>
                ((b.CheckInDate ?? DateTime.MinValue).Add(b.StartTime ?? TimeSpan.Zero)) < endDateTime &&
                ((b.CheckOutDate ?? DateTime.MinValue).Add(b.EndTime ?? TimeSpan.Zero)) > startDateTime);

            return totalActive;
        }
    }
}
