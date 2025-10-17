using Application.Features.Rooms.DTOs;
using MediatR;

namespace Application.Features.Rooms.Commands.RoomTypePrice.CreateRoomTypePrice
{
    public record CreateRoomTypePriceCommand(RoomTypePriceDto dto) : IRequest<RoomTypePriceDto>
    {
    }
}
