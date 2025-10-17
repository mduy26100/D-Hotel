using Application.Features.Rooms.DTOs;

namespace Application.Features.Rooms.Interfaces.Services.Command.RoomTypePrice.UpdateRoomTypePrice
{
    public interface IUpdateRoomTypePriceService
    {
        Task UpdateAsync(RoomTypePriceDto roomTypePriceDto, CancellationToken cancellationToken = default);
    }
}
