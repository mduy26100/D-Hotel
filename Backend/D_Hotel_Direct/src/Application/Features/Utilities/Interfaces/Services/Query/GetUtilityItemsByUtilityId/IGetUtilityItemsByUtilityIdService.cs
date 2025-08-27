using Application.Features.Utilities.DTOs;

namespace Application.Features.Utilities.Interfaces.Services.Query.GetUtilityItemsByUtilityId
{
    public interface IGetUtilityItemsByUtilityIdService
    {
        Task<IEnumerable<UtilityItemDto>> GetByUtilityIdAsync(int utilityId, CancellationToken cancellationToken = default);
    }
}