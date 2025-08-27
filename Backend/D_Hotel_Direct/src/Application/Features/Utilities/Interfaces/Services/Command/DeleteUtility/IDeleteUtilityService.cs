using Application.Features.Utilities.DTOs;

namespace Application.Features.Utilities.Interfaces.Services.Command.DeleteUtility
{
    public interface IDeleteUtilityService
    {
        Task DeleteAsync(UtilityDto utility, CancellationToken cancellationToken = default);
    }
}