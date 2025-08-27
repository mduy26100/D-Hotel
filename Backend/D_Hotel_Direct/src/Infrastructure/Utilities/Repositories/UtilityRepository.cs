using Application.Features.Utilities.Repositories;
using Infrastructure.Common.Persistence.Base;
using Infrastructure.Data;

namespace Infrastructure.Utilities.Repositories
{
    public class UtilityRepository : Repository<Utility>, IUtilityRepository
    {
        public UtilityRepository(ApplicationDbContext context) : base(context) { }

        public async Task<IEnumerable<Utility>> GetManyByIdsAsync(IEnumerable<int> ids, CancellationToken cancellationToken = default)
        {
            return await _dbSet
                .Where(u => ids.Contains(u.Id))
                .ToListAsync(cancellationToken);
        }

        public async Task<Utility?> GetWithItemsByIdAsync(int id, CancellationToken cancellationToken = default)
        {
            return await _dbSet
                .Include(u => _context.UtilityItems.Where(ui => ui.UtilityId == id))
                .FirstOrDefaultAsync(u => u.Id == id, cancellationToken);
        }
    }
}
