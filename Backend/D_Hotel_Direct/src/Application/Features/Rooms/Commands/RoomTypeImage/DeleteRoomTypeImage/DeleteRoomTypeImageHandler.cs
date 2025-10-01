using Application.Features.Rooms.Interfaces.Services.Command.RoomTypeImage.DeleteRoomTypeImage;
using MediatR;

namespace Application.Features.Rooms.Commands.RoomTypeImage.DeleteRoomTypeImage
{
    public class DeleteRoomTypeImageHandler : IRequestHandler<DeleteRoomTypeImageCommand, Unit>
    {
        private readonly IDeleteRoomTypeImageService _deleteRoomTypeImageService;

        public DeleteRoomTypeImageHandler(IDeleteRoomTypeImageService deleteRoomTypeImageService)
        {
            _deleteRoomTypeImageService = deleteRoomTypeImageService;
        }

        public async Task<Unit> Handle(DeleteRoomTypeImageCommand request, CancellationToken cancellationToken)
        {
            await _deleteRoomTypeImageService.DeleteAsync(request.dto, cancellationToken);
            return Unit.Value;
        }
    }
}
