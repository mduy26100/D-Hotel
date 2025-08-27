using Application.Features.Utilities.DTOs;
using Application.Features.Utilities.Interfaces.Services.Command.CreateUtility;
using MediatR;

namespace Application.Features.Utilities.Commands.CreateUtility
{
    public class CreateUtilityCommandHandler : IRequestHandler<CreateUtilityCommand, UtilityDto>
    {
        private readonly ICreateUtilityService _createUtilityService;

        public CreateUtilityCommandHandler(ICreateUtilityService createUtilityService)
        {
            _createUtilityService = createUtilityService;
        }

        public async Task<UtilityDto> Handle(CreateUtilityCommand request, CancellationToken cancellationToken)
        {
            // Tạo request mới đúng với CreateUtilityRequest đã refactor
            var createRequest = new UpsertUtilityRequest
            {
                Name = request.Name,
                ImageContent = request.ImageContent,
                ImageFileName = request.ImageFileName,
                ImageContentType = request.ImageContentType
            };

            return await _createUtilityService.CreateAsync(createRequest, cancellationToken);
        }
    }
}