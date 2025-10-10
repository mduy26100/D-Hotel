using Application.Common.Interfaces.Persistence.Base;
using Domain.Models.Utilities;

namespace Application.Features.Utilities.Repositories
{
    public interface IUtilityRepository : IRepository<Utility>
    {
        Task<IEnumerable<Utility>> GetManyByIdsAsync(IEnumerable<int> ids, CancellationToken cancellationToken = default);
    }
}
