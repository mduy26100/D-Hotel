using Application.Features.Rooms.DTOs;
using Application.Features.Rooms.Interfaces.Services.Command.RoomTypeImage.CreateRoomTypeImage;
using MediatR;

namespace Application.Features.Rooms.Commands.RoomTypeImage.CreateRoomTypeImage
{
    public class CreateRoomTypeImageHandler : IRequestHandler<CreateRoomTypeImageCommand, RoomTypeImageDto>
    {
        private readonly ICreateRoomTypeImageService _createRoomTypeImageService;

        public CreateRoomTypeImageHandler(ICreateRoomTypeImageService createRoomTypeImageService)
        {
            _createRoomTypeImageService = createRoomTypeImageService;
        }

        public async Task<RoomTypeImageDto> Handle(CreateRoomTypeImageCommand request, CancellationToken cancellationToken)
        {
            var result = await _createRoomTypeImageService.CreateAsync(request.requestUpsert, cancellationToken);
            return result;
        }
    }
}
