using Application.Features.Purposes.DTOs;
using MediatR;

namespace Application.Features.Purposes.Commands.RoomPurpose.UpdateRoomPurpose
{
    public record UpdateRoomPurposeCommand(RoomPurposeDto roomPurpose) : IRequest
    {
    }
}
