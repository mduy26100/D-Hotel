using Application.Features.Utilities.DTOs;
using MediatR;

namespace Application.Features.Utilities.Commands.RoomUtitlity.CreateRoomUtility
{
    public record CreateRoomUtilityCommand(RoomUtilityDto roomUtilityDto) : IRequest<RoomUtilityDto>
    {

    }
}
