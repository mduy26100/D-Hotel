using Application.Common.Interfaces.Persistence.EFCore;
using Application.Common.Interfaces.Services.FileUpLoad;
using Application.Common.Models;
using Application.Features.Hotels.DTOs;
using Application.Features.Hotels.Interfaces.Services.Command.CreateHotel;
using Application.Features.Hotels.Repositories;
using AutoMapper;
using Domain.Models.Hotels;

namespace Application.Features.Hotels.Services.Command.CreateHotel
{
    public class CreateHotelService : ICreateHotelService
    {
        private readonly IHotelRepository _hotelRepository;
        private readonly IFileUploadService _fileUploadService;
        private readonly IApplicationDbContext _context;
        private readonly IMapper _mapper;

        public CreateHotelService(
            IHotelRepository hotelRepository,
            IFileUploadService fileUploadService,
            IApplicationDbContext context,
            IMapper mapper)
        {
            _hotelRepository = hotelRepository;
            _fileUploadService = fileUploadService;
            _context = context;
            _mapper = mapper;
        }

        public async Task<HotelDto> CreateAsync(UpsertHotelRequest request, CancellationToken cancellationToken = default)
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

            var hotel = new Hotel
            {
                Name = request.Name,
                CategoryId = request.CategoryId,
                HotelManagerId = request.HotelManagerId,
                Address = request.Address,
                Description = request.Description,
                ImgUrl = imgUrl,
                IsActive = request.IsActive
            };

            await _hotelRepository.AddAsync(hotel, cancellationToken);
            await _context.SaveChangesAsync(cancellationToken);

            return _mapper.Map<HotelDto>(hotel);
        }
    }
}