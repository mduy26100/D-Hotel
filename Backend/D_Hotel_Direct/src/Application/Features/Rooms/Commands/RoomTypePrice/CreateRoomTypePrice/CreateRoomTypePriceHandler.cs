using Application.Features.Rooms.DTOs;
using Application.Features.Rooms.Interfaces.Services.Command.RoomTypePrice.CreateRoomTypePrice;
using MediatR;

namespace Application.Features.Rooms.Commands.RoomTypePrice.CreateRoomTypePrice
{
    public class CreateRoomTypePriceHandler : IRequestHandler<CreateRoomTypePriceCommand, RoomTypePriceDto>
    {
        private readonly ICreateRoomTypePriceService _createRoomTypePriceService;

        public CreateRoomTypePriceHandler(ICreateRoomTypePriceService createRoomTypePriceService)
        {
            _createRoomTypePriceService = createRoomTypePriceService;
        }

        public async Task<RoomTypePriceDto> Handle(CreateRoomTypePriceCommand request, CancellationToken cancellationToken)
        {
            return await _createRoomTypePriceService.CreateAsync(request.dto, cancellationToken);
        }
    }
}
