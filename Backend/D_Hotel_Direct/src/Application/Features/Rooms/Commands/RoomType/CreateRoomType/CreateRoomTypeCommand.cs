using Application.Features.Rooms.DTOs;
using MediatR;

namespace Application.Features.Rooms.Commands.RoomType.CreateRoomType
{
    public record CreateRoomTypeCommand(RoomTypeDto dto) : IRequest<RoomTypeDto>
    {
    }
}
