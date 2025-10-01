using Application.Common.Models;
using Application.Features.Rooms.DTOs;
using Application.Features.Rooms.Interfaces.Services.Command.RoomTypeImage.CreateRoomTypeImage;
using Application.Features.Rooms.Repositories;
using AutoMapper;
using RoomTypeImageEntity = Domain.Models.Rooms.RoomTypeImage;

namespace Application.Features.Rooms.Services.Command.RoomTypeImage.CreateRoomTypeImage
{
    public class CreateRoomTypeImageService : ICreateRoomTypeImageService
    {
        private readonly IRoomTypeImageRepository _roomTypeImageRepository;
        private readonly IFileUploadService _fileUploadService;
        private readonly IMapper _mapper;
        private readonly IApplicationDbContext _context;

        public CreateRoomTypeImageService(IRoomTypeImageRepository roomTypeImageRepository
            , IFileUploadService fileUploadService
            , IMapper mapper
            , IApplicationDbContext context)
        {
            _roomTypeImageRepository = roomTypeImageRepository;
            _fileUploadService = fileUploadService;
            _mapper = mapper;
            _context = context;
        }

        public async Task<RoomTypeImageDto> CreateAsync(UpsertRoomTypeImageRequest request, CancellationToken cancellationToken = default)
        {
            string imgUrl = string.Empty;
            if (request.ImgContent != null && !string.IsNullOrWhiteSpace(request.ImgFileName))
            {
                var uploadRequest = new FileUploadRequest
                {
                    Content = request.ImgContent,
                    FileName = request.ImgFileName!,
                    ContentType = request.ImgContentType ?? "image/jpeg"
                };
                imgUrl = await _fileUploadService.UploadAsync(uploadRequest, cancellationToken);
            }

            var roomTypeImage = new RoomTypeImageEntity
            {
                RoomTypeId = request.RoomTypeId,
                ImgUrl = imgUrl,
            };

            await _roomTypeImageRepository.AddAsync(roomTypeImage, cancellationToken);
            await _context.SaveChangesAsync(cancellationToken);
            
            return _mapper.Map<RoomTypeImageDto>(roomTypeImage);
        }
    }
}
