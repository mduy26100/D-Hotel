using Application.Features.Rooms.DTOs;

namespace Application.Features.Rooms.Interfaces.Services.Command.RoomTypeImage.UpdateRoomTypeImage
{
    public interface IUpdateRoomTypeImageService
    {
        Task UpdateAsync(UpsertRoomTypeImageRequest request, CancellationToken cancellationToken = default);
    }
}
