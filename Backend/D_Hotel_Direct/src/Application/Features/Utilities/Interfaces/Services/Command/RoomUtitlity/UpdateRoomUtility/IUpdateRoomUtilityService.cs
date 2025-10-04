using Application.Features.Utilities.DTOs;

namespace Application.Features.Utilities.Interfaces.Services.Command.RoomUtitlity.UpdateRoomUtility
{
    public interface IUpdateRoomUtilityService
    {
        Task UpdateAsync(RoomUtilityDto roomUtilityDto, CancellationToken cancellationToken = default);
    }
}
