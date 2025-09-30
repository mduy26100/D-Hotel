using Application.Features.Purposes.Interfaces.Services.Command.RoomPurpose.UpdateRoomPurpose;
using MediatR;

namespace Application.Features.Purposes.Commands.RoomPurpose.UpdateRoomPurpose
{
    public class UpdateRoomPurposeHandler : IRequestHandler<UpdateRoomPurposeCommand, Unit>
    {
        private readonly IUpdateRoomPurposeService _updateRoomPurposeService;

        public UpdateRoomPurposeHandler(IUpdateRoomPurposeService updateRoomPurposeService)
        {
            _updateRoomPurposeService = updateRoomPurposeService;
        }

        public async Task<Unit> Handle(UpdateRoomPurposeCommand request, CancellationToken cancellationToken)
        {
            await _updateRoomPurposeService.UpdateAsync(request.roomPurpose, cancellationToken);
            return Unit.Value;
        }
    }
}
