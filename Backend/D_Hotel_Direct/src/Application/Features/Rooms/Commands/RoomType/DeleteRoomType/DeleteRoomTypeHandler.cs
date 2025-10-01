using Application.Features.Rooms.Interfaces.Services.Command.RoomType.DeleteRoomType;
using MediatR;

namespace Application.Features.Rooms.Commands.RoomType.DeleteRoomType
{
    public class DeleteRoomTypeHandler : IRequestHandler<DeleteRoomTypeCommand, Unit>
    {
        private readonly IDeleteRoomTypeService _deleteRoomTypeService;

        public DeleteRoomTypeHandler(IDeleteRoomTypeService deleteRoomTypeService)
        {
            _deleteRoomTypeService = deleteRoomTypeService;
        }

        public async Task<Unit> Handle(DeleteRoomTypeCommand request, CancellationToken cancellationToken)
        {
            await _deleteRoomTypeService.DeleteAsync(request.dto, cancellationToken);
            return Unit.Value;
        }
    }
}
