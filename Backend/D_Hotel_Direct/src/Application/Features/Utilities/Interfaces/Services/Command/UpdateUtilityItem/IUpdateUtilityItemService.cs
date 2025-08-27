using Application.Features.Utilities.DTOs;

namespace Application.Features.Utilities.Interfaces.Services.Command.UpdateUtilityItem
{
    public interface IUpdateUtilityItemService
    {
        Task UpdateAsync(UtilityItemDto utilityItem, CancellationToken cancellationToken = default);
    }
}