using Application.Features.Rooms.DTOs;

namespace Application.Features.Rooms.Interfaces.Services.Command.RoomTypePrice.DeleteRoomTypePrice
{
    public interface IDeleteRoomTypePriceService
    {
        Task DeleteAsync(RoomTypePriceDto roomTypePriceDto, CancellationToken cancellationToken = default);
    }
}
