using Application.Features.Utilities.DTOs;
using MediatR;

namespace Application.Features.Utilities.Commands.RoomUtitlity.DeleteRoomUtitlity
{
    public record DeleteRoomUtitlityCommand(RoomUtilityDto roomUtilityDto) : IRequest
    {
    }
}
