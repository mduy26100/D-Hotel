using Application.Features.Rooms.DTOs;

namespace Application.Features.Rooms.Interfaces.Services.Command.RoomType.DeleteRoomType
{
    public interface IDeleteRoomTypeService
    {
        Task DeleteAsync(RoomTypeDto dto, CancellationToken cancellationToken = default);
    }
}
