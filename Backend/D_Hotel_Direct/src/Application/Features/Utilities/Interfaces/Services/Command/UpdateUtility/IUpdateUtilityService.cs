using Application.Features.Utilities.DTOs;

namespace Application.Features.Utilities.Interfaces.Services.Command.UpdateUtility
{
    public interface IUpdateUtilityService
    {
        Task UpdateAsync(UpsertUtilityRequest request, CancellationToken cancellationToken = default);
    }
}