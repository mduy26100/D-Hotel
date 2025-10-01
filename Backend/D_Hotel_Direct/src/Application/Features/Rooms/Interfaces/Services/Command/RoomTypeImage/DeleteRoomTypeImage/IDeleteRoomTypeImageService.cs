using Application.Features.Rooms.DTOs;

namespace Application.Features.Rooms.Interfaces.Services.Command.RoomTypeImage.DeleteRoomTypeImage
{
    public interface IDeleteRoomTypeImageService
    {
        Task DeleteAsync(RoomTypeImageDto dto, CancellationToken cancellationToken = default);
    }
}
