using Application.Common.Interfaces.Persistence.Base;
using Domain.Models.Utilities;

namespace Application.Features.Utilities.Repositories
{
    public interface IUtilityRepository : IRepository<Utility>
    {
        Task<Utility?> GetWithItemsByIdAsync(int id, CancellationToken cancellationToken = default);
        Task<IEnumerable<Utility>> GetManyByIdsAsync(IEnumerable<int> ids, CancellationToken cancellationToken = default);
    }
}
