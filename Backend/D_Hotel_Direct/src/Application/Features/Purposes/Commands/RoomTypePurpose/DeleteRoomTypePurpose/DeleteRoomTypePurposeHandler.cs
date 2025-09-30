using Application.Features.Purposes.Interfaces.Services.Command.RoomTypePurpose.DeleteRoomTypePurpose;
using MediatR;

namespace Application.Features.Purposes.Commands.RoomTypePurpose.DeleteRoomTypePurpose
{
    public class DeleteRoomTypePurposeHandler : IRequestHandler<DeleteRoomTypePurposeCommand, Unit>
    {
        private readonly IDeleteRoomTypePurposeService _deleteRoomTypePurposeService;

        public DeleteRoomTypePurposeHandler(IDeleteRoomTypePurposeService deleteRoomTypePurposeService)
        {
            _deleteRoomTypePurposeService = deleteRoomTypePurposeService;
        }

        public async Task<Unit> Handle(DeleteRoomTypePurposeCommand request, CancellationToken cancellationToken)
        {
            await _deleteRoomTypePurposeService.DeleteAsync(request.roomTypePurposeDto, cancellationToken);
            return Unit.Value;
        }
    }
}
