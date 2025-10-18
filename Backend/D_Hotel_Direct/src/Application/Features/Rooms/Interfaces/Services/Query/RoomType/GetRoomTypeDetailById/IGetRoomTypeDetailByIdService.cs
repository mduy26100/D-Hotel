using Application.Features.Rooms.DTOs;

namespace Application.Features.Rooms.Interfaces.Services.Query.RoomType.GetRoomTypeDetailById
{
    public interface IGetRoomTypeDetailByIdService
    {
        Task<RoomTypeDetailDto?> GetRoomTypeDetail(int roomTypeId, CancellationToken cancellationToken = default);
    }
}
