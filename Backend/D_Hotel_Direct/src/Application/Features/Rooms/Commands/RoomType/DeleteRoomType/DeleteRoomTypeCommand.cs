using Application.Features.Rooms.DTOs;
using MediatR;

namespace Application.Features.Rooms.Commands.RoomType.DeleteRoomType
{
    public record DeleteRoomTypeCommand(RoomTypeDto dto) : IRequest
    {
    }
}
