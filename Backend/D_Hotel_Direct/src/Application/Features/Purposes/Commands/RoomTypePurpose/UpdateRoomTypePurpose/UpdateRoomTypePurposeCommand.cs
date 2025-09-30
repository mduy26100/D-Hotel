using Application.Features.Purposes.DTOs;
using MediatR;

namespace Application.Features.Purposes.Commands.RoomTypePurpose.UpdateRoomTypePurpose
{
    public record UpdateRoomTypePurposeCommand(RoomTypePurposeDto roomTypePurposeDto) : IRequest
    {
    }
}
