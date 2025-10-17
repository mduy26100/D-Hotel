using Application.Features.Rooms.DTOs;
using MediatR;

namespace Application.Features.Rooms.Commands.RoomTypePrice.DeleteRoomTypePrice
{
    public record DeleteRoomTypePriceCommand(RoomTypePriceDto dto) : IRequest
    {
    }
}
