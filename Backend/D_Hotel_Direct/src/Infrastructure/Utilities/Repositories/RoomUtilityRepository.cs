using Application.Features.Utilities.Repositories;
using Infrastructure.Common.Persistence.Base;
using Infrastructure.Data;

namespace Infrastructure.Utilities.Repositories
{
    public class RoomUtilityRepository : Repository<RoomUtility>, IRoomUtilityRepository
    {
        public RoomUtilityRepository(ApplicationDbContext context) : base(context) { }

        public async Task<IEnumerable<RoomUtility>> GetByRoomIdAsync(int roomId, CancellationToken cancellationToken = default)
        {
            return await _dbSet
                .Where(x => x.RoomId == roomId)
                .ToListAsync(cancellationToken);
        }
    }
}
