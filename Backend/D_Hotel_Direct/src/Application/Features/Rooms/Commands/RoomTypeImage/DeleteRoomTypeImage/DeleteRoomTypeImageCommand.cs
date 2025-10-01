using Application.Features.Rooms.DTOs;
using MediatR;

namespace Application.Features.Rooms.Commands.RoomTypeImage.DeleteRoomTypeImage
{
    public record DeleteRoomTypeImageCommand(RoomTypeImageDto dto) : IRequest
    {
    }
}
