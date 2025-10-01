using Application.Features.Rooms.DTOs;

namespace Application.Features.Rooms.Interfaces.Services.Query.RoomTypeImage.GetRoomImagesByRoomTypeId
{
    public interface IGetRoomImagesByRoomTypeIdService
    {
        Task<IEnumerable<RoomTypeImageDto>> GetByRoomTypeIdAsync(int roomTypeId, CancellationToken cancellationToken = default);
    }
}
