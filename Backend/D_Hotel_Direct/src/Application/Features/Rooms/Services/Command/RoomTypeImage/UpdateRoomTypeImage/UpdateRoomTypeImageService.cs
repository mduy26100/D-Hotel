using Application.Common.Models;
using Application.Features.Rooms.DTOs;
using Application.Features.Rooms.Interfaces.Services.Command.RoomTypeImage.UpdateRoomTypeImage;
using Application.Features.Rooms.Repositories;
using AutoMapper;
using Domain.Models.Hotels;
using RoomTypeImageEntity = Domain.Models.Rooms.RoomTypeImage;

namespace Application.Features.Rooms.Services.Command.RoomTypeImage.UpdateRoomTypeImage
{
    public class UpdateRoomTypeImageService : IUpdateRoomTypeImageService
    {
        private readonly IRoomTypeImageRepository _roomTypeImageRepository;
        private readonly IFileUploadService _fileUploadService;
        private readonly IMapper _mapper;
        private readonly IApplicationDbContext _context;

        public UpdateRoomTypeImageService(IRoomTypeImageRepository roomTypeImageRepository
            , IFileUploadService fileUploadService
            , IMapper mapper
            , IApplicationDbContext context)
        {
            _roomTypeImageRepository = roomTypeImageRepository;
            _fileUploadService = fileUploadService;
            _mapper = mapper;
            _context = context;
        }

        public async Task UpdateAsync(UpsertRoomTypeImageRequest request, CancellationToken cancellationToken = default)
        {
            if (request.Id == null)
            {
                throw new ArgumentNullException(nameof(request.Id), "RoomTypeImage Id cannot be null when updating.");
            }

            var roomTypeImage = await _roomTypeImageRepository.GetByIdAsync(request.Id.Value, cancellationToken);

            if (roomTypeImage == null)
            {
                throw new InvalidOperationException("Room Type Image not found.");
            }

            if (request.ImgContent != null && !string.IsNullOrWhiteSpace(request.ImgFileName))
            {
                var uploadRequest = new FileUploadRequest
                {
                    Content = request.ImgContent,
                    FileName = request.ImgFileName!,
                    ContentType = request.ImgContentType ?? "image/jpeg"
                };
                roomTypeImage.ImgUrl = await _fileUploadService.UploadAsync(uploadRequest, cancellationToken);
            }

            roomTypeImage.RoomTypeId = request.RoomTypeId;

            _roomTypeImageRepository.Update(roomTypeImage);

            await _context.SaveChangesAsync(cancellationToken);
        }
    }
}
