using Application.Features.Rooms.Interfaces.Services.Command.RoomType.UpdateRoomType;
using MediatR;

namespace Application.Features.Rooms.Commands.RoomType.UpdateRoomType
{
    public class UpdateRoomTypeHandler : IRequestHandler<UpdateRoomTypeCommand, Unit>
    {
        private readonly IUpdateRoomTypeService _updateRoomTypeService;

        public UpdateRoomTypeHandler(IUpdateRoomTypeService updateRoomTypeService)
        {
            _updateRoomTypeService = updateRoomTypeService;
        }

        public async Task<Unit> Handle(UpdateRoomTypeCommand request, CancellationToken cancellationToken)
        {
            await _updateRoomTypeService.UpdateAsync(request.dto, cancellationToken);
            return Unit.Value;
        }
    }
}
