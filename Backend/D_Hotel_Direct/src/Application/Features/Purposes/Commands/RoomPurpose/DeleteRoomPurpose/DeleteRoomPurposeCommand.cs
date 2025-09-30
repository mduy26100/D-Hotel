using Application.Features.Purposes.DTOs;
using MediatR;

namespace Application.Features.Purposes.Commands.RoomPurpose.DeleteRoomPurpose
{
    public record DeleteRoomPurposeCommand(RoomPurposeDto roomPurposeDto) : IRequest
    {
    }
}
