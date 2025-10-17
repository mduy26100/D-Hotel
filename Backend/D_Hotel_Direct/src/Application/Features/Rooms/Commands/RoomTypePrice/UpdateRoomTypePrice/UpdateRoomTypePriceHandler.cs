using Application.Features.Rooms.Interfaces.Services.Command.RoomTypePrice.UpdateRoomTypePrice;
using MediatR;

namespace Application.Features.Rooms.Commands.RoomTypePrice.UpdateRoomTypePrice
{
    public class UpdateRoomTypePriceHandler : IRequestHandler<UpdateRoomTypePriceCommand, Unit>
    {
        private readonly IUpdateRoomTypePriceService _updateRoomTypePriceService;

        public UpdateRoomTypePriceHandler(IUpdateRoomTypePriceService updateRoomTypePriceService)
        {
            _updateRoomTypePriceService = updateRoomTypePriceService;
        }

        public async Task<Unit> Handle(UpdateRoomTypePriceCommand request, CancellationToken cancellationToken)
        {
            await _updateRoomTypePriceService.UpdateAsync(request.dto, cancellationToken);
            return Unit.Value;
        }
    }
}
