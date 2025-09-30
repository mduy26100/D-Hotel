using Application.Features.Purposes.Interfaces.Services.Command.RoomPurpose.DeleteRoomPurpose;
using MediatR;

namespace Application.Features.Purposes.Commands.RoomPurpose.DeleteRoomPurpose
{
    public class DeleteRoomPurposeHandler : IRequestHandler<DeleteRoomPurposeCommand, Unit>
    {
        private readonly IDeleteRoomPurposeService _deleteRoomPurposeService;

        public DeleteRoomPurposeHandler(IDeleteRoomPurposeService deleteRoomPurposeService)
        {
            _deleteRoomPurposeService = deleteRoomPurposeService;
        }

        public async Task<Unit> Handle(DeleteRoomPurposeCommand request, CancellationToken cancellationToken)
        {
            await _deleteRoomPurposeService.DeleteAsync(request.roomPurposeDto, cancellationToken);
            return Unit.Value;
        }
    }
}
