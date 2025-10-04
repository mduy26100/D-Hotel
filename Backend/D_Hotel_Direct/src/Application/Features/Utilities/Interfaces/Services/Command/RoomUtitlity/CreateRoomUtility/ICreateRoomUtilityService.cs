using Application.Features.Utilities.DTOs;

namespace Application.Features.Utilities.Interfaces.Services.Command.RoomUtitlity.CreateRoomUtility
{
    public interface ICreateRoomUtilityService
    {
        Task<RoomUtilityDto> CreateAsync(RoomUtilityDto roomUtilityDto, CancellationToken cancellationToken  = default);
    }
}
