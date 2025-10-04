using Application.Features.Utilities.DTOs;
using MediatR;

namespace Application.Features.Utilities.Commands.RoomUtitlity.UpdateRoomUtility
{
    public record UpdateRoomUtilityCommand(RoomUtilityDto roomUtilityDto) : IRequest
    {
    }
}
