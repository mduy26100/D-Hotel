using Application.Common.Interfaces.Persistence.EFCore;
using Application.Common.Interfaces.Services.FileUpLoad;
using Application.Common.Models;
using Application.Features.Utilities.DTOs;
using Application.Features.Utilities.Interfaces.Services.Command.CreateUtility;
using Application.Features.Utilities.Repositories;
using AutoMapper;
using Domain.Models.Utilities;

namespace Application.Features.Utilities.Services.Command.CreateUtility
{
    public class CreateUtilityService : ICreateUtilityService
    {
        private readonly IUtilityRepository _utilityRepository;
        private readonly IMapper _mapper;
        private readonly IFileUploadService _fileUploadService;
        private readonly IApplicationDbContext _context;

        public CreateUtilityService(IUtilityRepository utilityRepository,
                                    IMapper mapper,
                                    IFileUploadService fileUploadService,
                                    IApplicationDbContext context)
        {
            _utilityRepository = utilityRepository;
            _mapper = mapper;
            _fileUploadService = fileUploadService;
            _context = context;
        }

        public async Task<UtilityDto> CreateAsync(UpsertUtilityRequest request, CancellationToken cancellationToken = default)
        {
            string? iconUrl = null;

            // Nếu có ảnh thì upload
            if (request.ImageContent != null && !string.IsNullOrWhiteSpace(request.ImageFileName))
            {
                var uploadRequest = new FileUploadRequest
                {
                    Content = request.ImageContent,
                    FileName = request.ImageFileName!,
                    ContentType = request.ImageContentType ?? "image/jpeg"
                };

                iconUrl = await _fileUploadService.UploadAsync(uploadRequest, cancellationToken);
            }

            var entity = new Utility
            {
                Name = request.Name,
                IconUrl = iconUrl ?? string.Empty
            };

            await _utilityRepository.AddAsync(entity, cancellationToken);
            await _context.SaveChangesAsync(cancellationToken);

            return _mapper.Map<UtilityDto>(entity);
        }
    }
}