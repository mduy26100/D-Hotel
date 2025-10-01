using Application.Features.Rooms.DTOs;

namespace Application.Features.Rooms.Interfaces.Services.Query.RoomType.GetRoomTypeById
{
    public interface IGetRoomTypeByIdService
    {
        Task<RoomTypeDto> GetByIdAsync(int id, CancellationToken cancellationToken = default);
    }
}
