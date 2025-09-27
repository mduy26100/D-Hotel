using Application.Common.Interfaces.Persistence.Base;
using Domain.Models.Utilities;

namespace Application.Features.Utilities.Repositories
{
    public interface IUtilityItemRepository : IRepository<UtilityItem>
    {
        Task<IEnumerable<UtilityItem>> GetByUtilityIdListAsync(IEnumerable<int> utilityIds, CancellationToken cancellationToken = default);
    }
}
