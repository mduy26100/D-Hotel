using Application.Features.Places.Repositories;
using Domain.Models.Places;
using Infrastructure.Common.Persistence.Base;
using Infrastructure.Data;

namespace Infrastructure.Places.Repositories
{
    public class HotelLocationsRepository : Repository<HotelLocations>, IHotelLocationsRepository
    {
        public HotelLocationsRepository(ApplicationDbContext context) : base(context)
        {
        }

        public async Task<HotelLocations?> GetByHotelIdAsync(int hotelId, CancellationToken cancellationToken = default)
        {
            return await _dbSet
                .AsNoTracking()
                .FirstOrDefaultAsync(location => location.HotelId == hotelId, cancellationToken);
        }
    }
}
