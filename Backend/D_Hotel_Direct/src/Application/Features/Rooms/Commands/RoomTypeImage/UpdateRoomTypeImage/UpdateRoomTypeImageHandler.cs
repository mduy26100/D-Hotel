using Application.Features.Rooms.Interfaces.Services.Command.RoomTypeImage.UpdateRoomTypeImage;
using MediatR;

namespace Application.Features.Rooms.Commands.RoomTypeImage.UpdateRoomTypeImage
{
    public class UpdateRoomTypeImageHandler : IRequestHandler<UpdateRoomTypeImageCommand, Unit>
    {
        private readonly IUpdateRoomTypeImageService _updateRoomTypeImageService;

        public UpdateRoomTypeImageHandler(IUpdateRoomTypeImageService updateRoomTypeImageService)
        {
            _updateRoomTypeImageService = updateRoomTypeImageService;
        }

        public async Task<Unit> Handle(UpdateRoomTypeImageCommand request, CancellationToken cancellationToken)
        {
            await _updateRoomTypeImageService.UpdateAsync(request.requestUpsert, cancellationToken);
            
            return Unit.Value;
        }
    }
}
