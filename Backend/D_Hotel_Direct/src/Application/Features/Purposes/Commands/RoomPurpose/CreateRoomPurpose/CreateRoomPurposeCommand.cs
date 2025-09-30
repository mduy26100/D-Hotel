using Application.Features.Purposes.DTOs;
using MediatR;

namespace Application.Features.Purposes.Commands.RoomPurpose.CreateRoomPurpose
{
    public record CreateRoomPurposeCommand(RoomPurposeDto roomPurposeDto) : IRequest<RoomPurposeDto>
    {
    }
}
