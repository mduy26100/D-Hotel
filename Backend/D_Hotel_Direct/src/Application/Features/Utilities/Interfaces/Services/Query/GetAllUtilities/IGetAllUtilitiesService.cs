using Application.Features.Utilities.DTOs;

namespace Application.Features.Utilities.Interfaces.Services.Query.GetAllUtilities
{
    public interface IGetAllUtilitiesService
    {
        Task<IEnumerable<UtilityDto>> GetAllAsync(CancellationToken cancellationToken = default);
    }
}