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
            try
            {
                var roomTypeImageRequest = new UpsertRoomTypeImageRequest
                {
                    RoomTypeId = request.roomTypeId,
                    ImgContent = request.ImageContent,
                    ImgFileName = request.ImageFileName,
                    ImgContentType = request.ImageContentType
                };

                var result = await _createRoomTypeImageService.CreateAsync(roomTypeImageRequest, cancellationToken);

                return result;
            }
            catch (Exception)
            {

                throw;
            }
        }
    }
}
