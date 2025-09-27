using Application.Features.Hotels.Repositories;
using Infrastructure.Common.Persistence.Base;
using Infrastructure.Data;

namespace Infrastructure.Hotels.Repositories
{
    public class HotelStaffRepository : Repository<HotelStaff>, IHotelStaffRepository
    {
        public HotelStaffRepository(ApplicationDbContext context) : base(context)
        {
        }

        public async Task<IEnumerable<HotelStaff>> GetStaffsByHotelIdAsync(int hotelId, CancellationToken cancellationToken)
        {
            return await _context.HotelStaffs
                .Where(h => h.HotelId == hotelId)
                .ToListAsync(cancellationToken);
        }
    }
}
