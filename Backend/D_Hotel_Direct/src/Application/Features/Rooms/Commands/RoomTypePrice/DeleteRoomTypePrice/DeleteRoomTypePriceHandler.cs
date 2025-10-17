using Application.Features.Rooms.Interfaces.Services.Command.RoomTypePrice.DeleteRoomTypePrice;
using MediatR;

namespace Application.Features.Rooms.Commands.RoomTypePrice.DeleteRoomTypePrice
{
    public class DeleteRoomTypePriceHandler : IRequestHandler<DeleteRoomTypePriceCommand, Unit>
    {
        private readonly IDeleteRoomTypePriceService _deleteRoomTypePriceService;

        public DeleteRoomTypePriceHandler(IDeleteRoomTypePriceService deleteRoomTypePriceService)
        {
            _deleteRoomTypePriceService = deleteRoomTypePriceService;
        }

        public async Task<Unit> Handle(DeleteRoomTypePriceCommand request, CancellationToken cancellationToken)
        {
            await _deleteRoomTypePriceService.DeleteAsync(request.dto, cancellationToken);
            return Unit.Value;
        }
    }
}
