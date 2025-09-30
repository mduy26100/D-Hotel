using Application.Features.Purposes.DTOs;

namespace Application.Features.Purposes.Interfaces.Services.Query.RoomTypePurpose.GetRoomPurposeByRoomId
{
    public interface IGetRoomPurposeByRoomIdService
    {
        Task<RoomTypePurposeDto> GetRoomPurposeByRoomId(int roomId, CancellationToken cancellationToken = default);
    }
}
