using MediatR;

namespace Application.Features.Utilities.Commands.RoomUtitlity.UpdateRoomUtility
{
    public record UpdateRoomUtilityCommand(int roomId, string utilityIds) : IRequest
    {
    }
}
