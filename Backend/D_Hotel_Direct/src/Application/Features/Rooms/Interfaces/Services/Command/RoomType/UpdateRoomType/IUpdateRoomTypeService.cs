using Application.Features.Rooms.DTOs;

namespace Application.Features.Rooms.Interfaces.Services.Command.RoomType.UpdateRoomType
{
    public interface IUpdateRoomTypeService
    {
        Task UpdateAsync(RoomTypeDto dto, CancellationToken cancellationToken = default);
    }
}
