using Application.Features.Rooms.DTOs;

namespace Application.Features.Rooms.Interfaces.Services.Query.RoomTypePrice.GetAllRoomTypePrices
{
    public interface IGetAllRoomTypePricesService
    {
        Task<IEnumerable<RoomTypePriceDto>> GetAllAsync(CancellationToken cancellationToken = default);
    }
}