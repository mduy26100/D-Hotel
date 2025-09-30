using Application.Features.Purposes.DTOs;
using MediatR;

namespace Application.Features.Purposes.Commands.RoomTypePurpose.CreateRoomTypePurpose
{
    public record CreateRoomTypePurposeCommand(RoomTypePurposeDto roomTypePurposeDto) : IRequest<RoomTypePurposeDto>
    {
    }
}
