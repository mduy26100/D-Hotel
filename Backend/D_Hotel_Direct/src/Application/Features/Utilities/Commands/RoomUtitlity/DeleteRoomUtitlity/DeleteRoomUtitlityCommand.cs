using MediatR;

namespace Application.Features.Utilities.Commands.RoomUtitlity.DeleteRoomUtitlity
{
    public record DeleteRoomUtitlityCommand(int roomId, string utilityIds) : IRequest
    {
    }
}
