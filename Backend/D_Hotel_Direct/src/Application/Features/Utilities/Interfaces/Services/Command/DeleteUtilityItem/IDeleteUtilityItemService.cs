using Application.Features.Utilities.DTOs;
using Domain.Models.Utilities;

namespace Application.Features.Utilities.Interfaces.Services.Command.DeleteUtilityItem
{
    public interface IDeleteUtilityItemService
    {
        Task DeleteAsync(UtilityItemDto utilityItem, CancellationToken cancellationToken = default);
    }
}