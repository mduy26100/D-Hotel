using Application.Features.Rooms.DTOs;
using MediatR;

namespace Application.Features.Rooms.Commands.RoomTypeImage.UpdateRoomTypeImage
{
    public record UpdateRoomTypeImageCommand(UpsertRoomTypeImageRequest requestUpsert) : IRequest
    {
    }
}
