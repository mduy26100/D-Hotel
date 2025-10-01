using Application.Features.Rooms.DTOs;
using MediatR;

namespace Application.Features.Rooms.Commands.RoomType.UpdateRoomType
{
    public record UpdateRoomTypeCommand(RoomTypeDto dto) : IRequest
    {
    }
}
