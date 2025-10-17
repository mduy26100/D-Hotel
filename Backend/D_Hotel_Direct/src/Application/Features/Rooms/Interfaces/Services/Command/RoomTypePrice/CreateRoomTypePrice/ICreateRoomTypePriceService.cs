using Application.Features.Rooms.DTOs;

namespace Application.Features.Rooms.Interfaces.Services.Command.RoomTypePrice.CreateRoomTypePrice
{
    public interface ICreateRoomTypePriceService
    {
        Task<RoomTypePriceDto> CreateAsync(RoomTypePriceDto roomTypePriceDto, CancellationToken cancellationToken = default);
    }
}
