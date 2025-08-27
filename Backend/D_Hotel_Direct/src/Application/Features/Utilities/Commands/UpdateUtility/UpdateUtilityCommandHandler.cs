using Application.Features.Utilities.DTOs;
using Application.Features.Utilities.Interfaces.Services.Command.UpdateUtility;
using Application.Common.Interfaces.Logging;
using MediatR;

namespace Application.Features.Utilities.Commands.UpdateUtility
{
    public class UpdateUtilityCommandHandler : IRequestHandler<UpdateUtilityCommand, Unit>
    {
        private readonly IUpdateUtilityService _updateUtilityService;
        private readonly ILoggingService<UpdateUtilityCommandHandler> _logger;

        public UpdateUtilityCommandHandler(
            IUpdateUtilityService updateUtilityService,
            ILoggingService<UpdateUtilityCommandHandler> logger)
        {
            _updateUtilityService = updateUtilityService;
            _logger = logger;
        }

        public async Task<Unit> Handle(UpdateUtilityCommand request, CancellationToken cancellationToken)
        {
            try
            {
                _logger.LogInformation($"[UpdateUtility] Start updating utility with Id: {request.Dto.Id}, Name: {request.Dto.Name}");

                var updateRequest = new UpsertUtilityRequest
                {
                    Id = request.Dto.Id,
                    Name = request.Dto.Name,
                    ImageContent = request.ImageContent,
                    ImageFileName = request.ImageFileName,
                    ImageContentType = request.ImageContentType
                };

                await _updateUtilityService.UpdateAsync(updateRequest, cancellationToken);

                _logger.LogInformation($"[UpdateUtility] Successfully updated utility with Id: {request.Dto.Id}, Name: {request.Dto.Name}");

                return Unit.Value;
            }
            catch (Exception ex)
            {
                _logger.LogError($"[UpdateUtility] Error updating utility with Id: {request.Dto.Id}, Name: {request.Dto.Name}", ex);
                throw;
            }
        }
    }
}