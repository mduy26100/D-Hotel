using Application.Features.Rooms.DTOs;

namespace Application.Features.Rooms.Interfaces.Services.Query.RoomType.GetRoomTypeByBedTypeId
{
    public interface IGetRoomTypeByBedTypeIdService
    {
        Task<RoomTypeDto> GetByBedTypeIdAsync(int bedTypeId, CancellationToken cancellationToken = default);
    }
}
