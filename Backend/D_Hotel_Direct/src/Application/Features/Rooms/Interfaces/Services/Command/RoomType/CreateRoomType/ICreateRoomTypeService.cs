using Application.Features.Rooms.DTOs;

namespace Application.Features.Rooms.Interfaces.Services.Command.RoomType.CreateRoomType
{
    public interface ICreateRoomTypeService
    {
        Task<RoomTypeDto> CreateAsync(RoomTypeDto dto, CancellationToken cancellationToken = default);
    }
}
