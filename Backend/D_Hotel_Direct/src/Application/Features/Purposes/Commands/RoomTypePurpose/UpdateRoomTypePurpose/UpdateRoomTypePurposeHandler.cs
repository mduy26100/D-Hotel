using Application.Features.Purposes.Interfaces.Services.Command.RoomTypePurpose.UpdateRoomTypePurpose;
using MediatR;

namespace Application.Features.Purposes.Commands.RoomTypePurpose.UpdateRoomTypePurpose
{
    public class UpdateRoomTypePurposeHandler : IRequestHandler<UpdateRoomTypePurposeCommand, Unit>
    {
        private readonly IUpdateRoomTypePurposeService _updateRoomTypePurposeService;

        public UpdateRoomTypePurposeHandler(IUpdateRoomTypePurposeService updateRoomTypePurposeService)
        {
            _updateRoomTypePurposeService = updateRoomTypePurposeService;
        }

        public async Task<Unit> Handle(UpdateRoomTypePurposeCommand request, CancellationToken cancellationToken)
        {
            await _updateRoomTypePurposeService.UpdateAsync(request.roomTypePurposeDto, cancellationToken);
            return Unit.Value;
        }
    }
}
