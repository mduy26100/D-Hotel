using Application.Features.Rooms.DTOs;
using Application.Features.Rooms.Interfaces.Services.Command.RoomTypeImage.UpdateRoomTypeImage;
using MediatR;
using System.Reflection.Metadata.Ecma335;

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
            try
            {
                var roomTypeImageRequest = new UpsertRoomTypeImageRequest
                {
                    Id = request.id,
                    RoomTypeId = request.roomTypeId,
                    ImgContent = request.ImageContent,
                    ImgFileName = request.ImageFileName,
                    ImgContentType = request.ImageContentType
                };

                await _updateRoomTypeImageService.UpdateAsync(roomTypeImageRequest, cancellationToken);

                return Unit.Value;
            }
            catch (Exception)
            {

                throw;
            }
        }
    }
}
