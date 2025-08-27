using Application.Features.Places.DTOs;
using Application.Features.Places.Interfaces.Services.Command.UpdateLocation;
using Application.Common.Interfaces.Logging;
using MediatR;

namespace Application.Features.Places.Commands.UpdateLocation
{
    public class UpdateLocationCommandHandler : IRequestHandler<UpdateLocationCommand, Unit>
    {
        private readonly IUpdateLocationService _updateLocationService;
        private readonly ILoggingService<UpdateLocationCommandHandler> _logger;

        public UpdateLocationCommandHandler(
            IUpdateLocationService updateLocationService,
            ILoggingService<UpdateLocationCommandHandler> logger)
        {
            _updateLocationService = updateLocationService;
            _logger = logger;
        }

        public async Task<Unit> Handle(UpdateLocationCommand request, CancellationToken cancellationToken)
        {
            try
            {
                _logger.LogInformation($"[UpdateLocation] Starting update for LocationId: {request.dto.Id}");

                var updateRequest = new UpsertLocationRequest
                {
                    Id = request.dto.Id,
                    Name = request.dto.Name,
                    ImageContent = request.ImageContent,
                    ImageFileName = request.ImageFileName,
                    ImageContentType = request.ImageContentType
                };

                await _updateLocationService.UpdateAsync(updateRequest, cancellationToken);

                _logger.LogInformation($"[UpdateLocation] Successfully updated LocationId: {request.dto.Id}");

                return Unit.Value;
            }
            catch (Exception ex)
            {
                _logger.LogError($"[UpdateLocation] Error while updating LocationId: {request.dto.Id}", ex);
                throw;
            }
        }
    }
}
