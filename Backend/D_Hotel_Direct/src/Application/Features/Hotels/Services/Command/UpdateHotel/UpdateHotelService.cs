using Application.Common.Interfaces.Persistence.EFCore;
using Application.Common.Interfaces.Services.FileUpLoad;
using Application.Common.Models;
using Application.Features.Hotels.DTOs;
using Application.Features.Hotels.Interfaces.Services.Command.UpdateHotel;
using Application.Features.Hotels.Repositories;
using Application.Features.Utilities.Repositories;
using AutoMapper;

namespace Application.Features.Hotels.Services.Command.UpdateHotel
{
    public class UpdateHotelService : IUpdateHotelService
    {
        private readonly IHotelRepository _hotelRepository;
        private readonly IFileUploadService _fileUploadService;
        private readonly IApplicationDbContext _context;
        private readonly IMapper _mapper;

        public UpdateHotelService(
            IHotelRepository hotelRepository,
            IHotelUtilityRepository hotelUtilityItemRepository,
            IFileUploadService fileUploadService,
            IApplicationDbContext context,
            IMapper mapper)
        {
            _hotelRepository = hotelRepository;
            _fileUploadService = fileUploadService;
            _context = context;
            _mapper = mapper;
        }

        public async Task UpdateAsync(UpsertHotelRequest request, CancellationToken cancellationToken = default)
        {
            var hotel = await _hotelRepository.GetByIdAsync(request.Id!.Value, cancellationToken);
            if (hotel == null)
                throw new InvalidOperationException("Hotel not found.");

            if (request.ImgContent != null && !string.IsNullOrWhiteSpace(request.ImgFileName))
            {
                var uploadRequest = new FileUploadRequest
                {
                    Content = request.ImgContent,
                    FileName = request.ImgFileName!,
                    ContentType = request.ImgContentType ?? "image/jpeg"
                };
                hotel.ImgUrl = await _fileUploadService.UploadAsync(uploadRequest, cancellationToken);
            }

            hotel.Name = request.Name;
            hotel.CategoryId = request.CategoryId;
            hotel.HotelManagerId = request.HotelManagerId;
            hotel.Address = request.Address;
            hotel.Description = request.Description;
            hotel.IsActive = request.IsActive;

            _hotelRepository.Update(hotel);

            await _context.SaveChangesAsync(cancellationToken);
        }
    }
}