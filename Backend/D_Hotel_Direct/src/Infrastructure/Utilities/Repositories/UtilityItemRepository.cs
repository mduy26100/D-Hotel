using Application.Features.Utilities.Repositories;
using Infrastructure.Common.Persistence.Base;
using Infrastructure.Data;

namespace Infrastructure.Utilities.Repositories
{
    public class UtilityItemRepository : Repository<UtilityItem>, IUtilityItemRepository
    {
        public UtilityItemRepository(ApplicationDbContext context) : base(context) { }

        public async Task<IEnumerable<UtilityItem>> GetByUtilityIdAsync(int utilityId, CancellationToken cancellationToken = default)
        {
            return await _dbSet
                .Where(x => x.UtilityId == utilityId)
                .ToListAsync(cancellationToken);
        }

        public async Task<IEnumerable<UtilityItem>> GetByUtilityIdListAsync(IEnumerable<int> utilityIds, CancellationToken cancellationToken = default)
        {
            return await _dbSet
            .AsNoTracking()
            .Where(x => utilityIds.Contains(x.UtilityId))
            .ToListAsync(cancellationToken);
        }
    }
}
