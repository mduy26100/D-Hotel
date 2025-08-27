using Application.Common.Interfaces.Persistence.EFCore;
using Application.Common.Interfaces.Services.FileUpLoad;
using Application.Common.Models;
using Application.Features.Utilities.DTOs;
using Application.Features.Utilities.Interfaces.Services.Command.UpdateUtility;
using Application.Features.Utilities.Repositories;
using AutoMapper;

namespace Application.Features.Utilities.Services.Command.UpdateUtility
{
    public class UpdateUtilityService : IUpdateUtilityService
    {
        private readonly IUtilityRepository _utilityRepository;
        private readonly IMapper _mapper;
        private readonly IFileUploadService _fileUploadService;
        private readonly IApplicationDbContext _context;

        public UpdateUtilityService(IUtilityRepository utilityRepository,
                                    IMapper mapper,
                                    IFileUploadService fileUploadService,
                                    IApplicationDbContext context)
        {
            _utilityRepository = utilityRepository;
            _mapper = mapper;
            _fileUploadService = fileUploadService;
            _context = context;
        }

        public async Task UpdateAsync(UpsertUtilityRequest request, CancellationToken cancellationToken = default)
        {
            if (request.Id == null)
                throw new ArgumentException("Utility ID is required for update.");

            var entity = await _utilityRepository.GetByIdAsync(request.Id.Value, cancellationToken);
            if (entity == null)
            {
                throw new Exception("Utility not found.");
            }

            if (request.ImageContent != null && !string.IsNullOrWhiteSpace(request.ImageFileName))
            {
                var uploadRequest = new FileUploadRequest
                {
                    Content = request.ImageContent,
                    FileName = request.ImageFileName,
                    ContentType = request.ImageContentType ?? "image/jpeg"
                };

                var iconUrl = await _fileUploadService.UploadAsync(uploadRequest, cancellationToken);
                entity.IconUrl = iconUrl;
            }

            entity.Name = request.Name;

            _utilityRepository.Update(entity);
            await _context.SaveChangesAsync(cancellationToken);
        }
    }
}