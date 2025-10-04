using Application.Features.Utilities.Interfaces.Services.Command.RoomUtitlity.DeleteRoomUtility;
using MediatR;

namespace Application.Features.Utilities.Commands.RoomUtitlity.DeleteRoomUtitlity
{
    public class DeleteRoomUtitlityHandler : IRequestHandler<DeleteRoomUtitlityCommand, Unit>
    {
        private readonly IDeleteRoomUtilityService _deleteRoomUtilityService;

        public DeleteRoomUtitlityHandler(IDeleteRoomUtilityService deleteRoomUtilityService)
        {
            _deleteRoomUtilityService = deleteRoomUtilityService;
        }

        public async Task<Unit> Handle(DeleteRoomUtitlityCommand request, CancellationToken cancellationToken)
        {
            await _deleteRoomUtilityService.DeleteAsync(request.roomUtilityDto, cancellationToken);
            return Unit.Value;
        }
    }
}
