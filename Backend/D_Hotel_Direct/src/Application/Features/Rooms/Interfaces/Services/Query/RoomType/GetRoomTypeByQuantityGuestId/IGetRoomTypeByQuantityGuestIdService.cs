using Application.Features.Rooms.DTOs;

namespace Application.Features.Rooms.Interfaces.Services.Query.RoomType.GetRoomTypeByQuantityGuestId
{
    public interface IGetRoomTypeByQuantityGuestIdService
    {
        Task<RoomTypeDto> GetByQuantityGuestIdAsync(int quantityGuestId, CancellationToken cancellationToken = default);
    }
}
