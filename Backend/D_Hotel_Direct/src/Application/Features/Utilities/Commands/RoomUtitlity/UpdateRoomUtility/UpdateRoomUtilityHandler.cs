using Application.Features.Utilities.Interfaces.Services.Command.RoomUtitlity.UpdateRoomUtility;
using MediatR;

namespace Application.Features.Utilities.Commands.RoomUtitlity.UpdateRoomUtility
{
    public class UpdateRoomUtilityHandler : IRequestHandler<UpdateRoomUtilityCommand, Unit>
    {
        private readonly IUpdateRoomUtilityService _updateRoomUtilityService;

        public UpdateRoomUtilityHandler(IUpdateRoomUtilityService updateRoomUtilityService)
        {
            _updateRoomUtilityService = updateRoomUtilityService;
        }

        public async Task<Unit> Handle(UpdateRoomUtilityCommand request, CancellationToken cancellationToken)
        {
            await _updateRoomUtilityService.UpdateAsync(request.roomUtilityDto, cancellationToken);
            return Unit.Value;
        }
    }
}
