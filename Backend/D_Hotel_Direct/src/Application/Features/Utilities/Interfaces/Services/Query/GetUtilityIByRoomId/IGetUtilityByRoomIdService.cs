using Application.Features.Utilities.DTOs;

namespace Application.Features.Utilities.Interfaces.Services.Query.GetUtilityByRoomId
{
    public interface IGetUtilityByRoomIdService
    {
        Task<IEnumerable<RoomUtilityDto>> GetByIdAsync(int roomId, CancellationToken cancellationToken = default);
    }
}
