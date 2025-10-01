using Application.Features.Rooms.DTOs;

namespace Application.Features.Rooms.Interfaces.Services.Command.RoomTypeImage.CreateRoomTypeImage
{
    public interface ICreateRoomTypeImageService
    {
        Task<RoomTypeImageDto> CreateAsync(UpsertRoomTypeImageRequest request, CancellationToken cancellationToken = default);
    }
}
