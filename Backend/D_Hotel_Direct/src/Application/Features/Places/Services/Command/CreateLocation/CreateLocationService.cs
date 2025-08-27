using Application.Common.Interfaces.Persistence.EFCore;
using Application.Common.Interfaces.Services.FileUpLoad;
using Application.Common.Models;
using Application.Features.Places.DTOs;
using Application.Features.Places.Interfaces.Services.Command.CreateLocation;
using Application.Features.Places.Repositories;
using AutoMapper;
using Domain.Models.Places;

namespace Application.Features.Places.Services.Command.CreateLocation
{
    public class CreateLocationService : ICreateLocationService
    {
        private readonly ILocationsRepository _locationsRepository;
        private readonly IMapper _mapper;
        private readonly IFileUploadService _fileUploadService;
        private readonly IApplicationDbContext _context;

        public CreateLocationService(
            ILocationsRepository locationsRepository,
            IMapper mapper,
            IFileUploadService fileUploadService,
            IApplicationDbContext context)
        {
            _locationsRepository = locationsRepository;
            _mapper = mapper;
            _fileUploadService = fileUploadService;
            _context = context;
        }

        public async Task<LocationsDto> CreateAsync(UpsertLocationRequest request, CancellationToken cancellationToken = default)
        {
            string? imageUrl = null;

            if (request.ImageContent != null && !string.IsNullOrWhiteSpace(request.ImageFileName))
            {
                var uploadRequest = new FileUploadRequest
                {
                    Content = request.ImageContent,
                    FileName = request.ImageFileName,
                    ContentType = request.ImageContentType ?? "image/jpeg"
                };

                imageUrl = await _fileUploadService.UploadAsync(uploadRequest, cancellationToken);
            }

            var entity = new Locations
            {
                Name = request.Name,
                ImgUrl = imageUrl ?? string.Empty,
            };

            await _locationsRepository.AddAsync(entity, cancellationToken);
            await _context.SaveChangesAsync(cancellationToken);

            return _mapper.Map<LocationsDto>(entity);
        }
    }
}
