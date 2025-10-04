using Application.Features.Utilities.DTOs;

namespace Application.Features.Utilities.Interfaces.Services.Command.RoomUtitlity.DeleteRoomUtility
{
    public interface IDeleteRoomUtilityService
    {
        Task DeleteAsync(RoomUtilityDto roomUtilityDto, CancellationToken cancellationToken = default);
    }
}
