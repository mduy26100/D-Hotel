using Application.Features.Rooms.DTOs;

namespace Application.Features.Rooms.Interfaces.Services.Query.RoomType.GetAllRoomTypes
{
    public interface IGetAllRoomTypesService
    {
        Task<IEnumerable<RoomTypeDto>> GetAllAsync(CancellationToken cancellationToken = default);
    }
}
