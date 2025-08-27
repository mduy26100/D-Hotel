using Application.Features.Utilities.DTOs;
using Application.Features.Utilities.Interfaces.Services.Command.CreateUtility;
using Application.Common.Interfaces.Logging;
using MediatR;

namespace Application.Features.Utilities.Commands.CreateUtility
{
    public class CreateUtilityCommandHandler : IRequestHandler<CreateUtilityCommand, UtilityDto>
    {
        private readonly ICreateUtilityService _createUtilityService;
        private readonly ILoggingService<CreateUtilityCommandHandler> _logger;

        public CreateUtilityCommandHandler(
            ICreateUtilityService createUtilityService,
            ILoggingService<CreateUtilityCommandHandler> logger)
        {
            _createUtilityService = createUtilityService;
            _logger = logger;
        }

        public async Task<UtilityDto> Handle(CreateUtilityCommand request, CancellationToken cancellationToken)
        {
            try
            {
                _logger.LogInformation($"[CreateUtility] Start creating utility with Name: {request.Name}");

                var createRequest = new UpsertUtilityRequest
                {
                    Name = request.Name,
                    ImageContent = request.ImageContent,
                    ImageFileName = request.ImageFileName,
                    ImageContentType = request.ImageContentType
                };

                var result = await _createUtilityService.CreateAsync(createRequest, cancellationToken);

                _logger.LogInformation($"[CreateUtility] Successfully created utility with Name: {request.Name}, Id: {result.Id}");

                return result;
            }
            catch (Exception ex)
            {
                _logger.LogError($"[CreateUtility] Error creating utility with Name: {request.Name}", ex);
                throw;
            }
        }
    }
}