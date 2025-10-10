using Application.Features.Rooms.DTOs;
using MediatR;

namespace Application.Features.Rooms.Commands.RoomTypeImage.UpdateRoomTypeImage
{
    public record UpdateRoomTypeImageCommand(int id, int roomTypeId, Stream? ImageContent, string? ImageFileName, string? ImageContentType) : IRequest
    {
    }
}
