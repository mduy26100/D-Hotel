using Application.Features.Rooms.DTOs;
using MediatR;

namespace Application.Features.Rooms.Commands.RoomTypePrice.UpdateRoomTypePrice
{
    public record UpdateRoomTypePriceCommand(RoomTypePriceDto dto) : IRequest
    {
    }
}
