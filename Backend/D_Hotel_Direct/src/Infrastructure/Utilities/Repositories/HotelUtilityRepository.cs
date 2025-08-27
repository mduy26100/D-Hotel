using Application.Features.Utilities.Repositories;
using Infrastructure.Common.Persistence.Base;
using Infrastructure.Data;

namespace Infrastructure.Utilities.Repositories
{
    public class HotelUtilityRepository : Repository<HotelUtility>, IHotelUtilityRepository
    {
        public HotelUtilityRepository(ApplicationDbContext context) : base(context) { }

        public async Task<IEnumerable<HotelUtility>> GetByHotelIdAsync(int hotelId, CancellationToken cancellationToken = default)
        {
            return await _dbSet
                .Where(x => x.HotelId == hotelId)
                .ToListAsync(cancellationToken);
        }
    }
}
