using Application.Common.Interfaces.Persistence.EFCore;
using Application.Common.Interfaces.Services.FileUpLoad;
using Application.Common.Models;
using Application.Features.Places.DTOs;
using Application.Features.Places.Interfaces.Services.Command.UpdateLocation;
using Application.Features.Places.Repositories;
using AutoMapper;

namespace Application.Features.Places.Services.Command.UpdateLocation
{
    public class UpdateLocationService : IUpdateLocationService
    {
        private readonly ILocationsRepository _locationsRepository;
        private readonly IMapper _mapper;
        private readonly IFileUploadService _fileUploadService;
        private readonly IApplicationDbContext _context;

        public UpdateLocationService(ILocationsRepository locationsRepository
            , IMapper mapper
            , IFileUploadService fileUploadService
            , IApplicationDbContext context)
        {
            _locationsRepository = locationsRepository;
            _mapper = mapper;
            _fileUploadService = fileUploadService;
            _context = context;
        }

        public async Task UpdateAsync(UpsertLocationRequest request, CancellationToken cancellationToken = default)
        {
            if(request.Id == null || request.Id <= 0)
            {
                throw new ArgumentException("Invalid location ID.");
            }

            var entity = await _locationsRepository.GetByIdAsync(request.Id.Value, cancellationToken);
            if (entity == null)
            {
                throw new KeyNotFoundException($"Location with ID {request.Id} not found.");
            }

            if(request.ImageContent != null && !string.IsNullOrWhiteSpace(request.ImageFileName))
            {
                var uploadRequest = new FileUploadRequest
                {
                    Content = request.ImageContent,
                    FileName = request.ImageFileName,
                    ContentType = request.ImageContentType ?? "image/jpeg"
                };

                var imgUrl = await _fileUploadService.UploadAsync(uploadRequest, cancellationToken);
                entity.ImgUrl = imgUrl;
            }

            entity.Name = request.Name;

            _locationsRepository.Update(entity);
            await _context.SaveChangesAsync(cancellationToken);
        }
    }
}
