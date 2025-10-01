using Application.Features.Rooms.DTOs;
using MediatR;

namespace Application.Features.Rooms.Commands.RoomTypeImage.CreateRoomTypeImage
{
    public record CreateRoomTypeImageCommand(UpsertRoomTypeImageRequest requestUpsert) : IRequest<RoomTypeImageDto>
    {
    }
}
