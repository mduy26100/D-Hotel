using Application.Features.Purposes.DTOs;
using MediatR;

namespace Application.Features.Purposes.Commands.RoomTypePurpose.DeleteRoomTypePurpose
{
    public record DeleteRoomTypePurposeCommand(RoomTypePurposeDto roomTypePurposeDto) : IRequest
    {
    }
}
