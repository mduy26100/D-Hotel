using Application.Features.Utilities.DTOs;

namespace Application.Features.Utilities.Interfaces.Services.Command.CreateUtilityItem
{
    public interface ICreateUtilityItemService
    {
        Task<UtilityItemDto> CreateAsync(UtilityItemDto utilityItem, CancellationToken cancellationToken = default);
    }
}