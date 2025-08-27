using Application.Features.Utilities.DTOs;

namespace Application.Features.Utilities.Interfaces.Services.Command.CreateUtility
{
    public interface ICreateUtilityService
    {
        public Task<UtilityDto> CreateAsync(UpsertUtilityRequest request, CancellationToken cancellationToken = default);
    }
}