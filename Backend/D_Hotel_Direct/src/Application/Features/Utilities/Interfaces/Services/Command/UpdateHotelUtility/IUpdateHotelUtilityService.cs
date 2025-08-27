using Application.Features.Utilities.DTOs;

namespace Application.Features.Utilities.Interfaces.Services.Command.UpdateHotelUtility
{
    public interface IUpdateHotelUtilityService
    {
        Task UpdateAsync(HotelUtilityDto request, CancellationToken cancellationToken = default);
    }
}
