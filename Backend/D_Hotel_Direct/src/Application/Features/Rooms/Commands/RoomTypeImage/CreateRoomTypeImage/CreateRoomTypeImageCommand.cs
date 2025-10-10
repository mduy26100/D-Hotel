using Application.Features.Rooms.DTOs;
using MediatR;

namespace Application.Features.Rooms.Commands.RoomTypeImage.CreateRoomTypeImage
{
    public record CreateRoomTypeImageCommand(int roomTypeId, Stream? ImageContent, string? ImageFileName, string? ImageContentType) : IRequest<RoomTypeImageDto>
    {
    }
}
