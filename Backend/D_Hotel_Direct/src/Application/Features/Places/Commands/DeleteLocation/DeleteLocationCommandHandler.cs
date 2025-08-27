using Application.Features.Places.Interfaces.Services.Command.DeleteLocation;
using Application.Common.Interfaces.Logging;
using MediatR;

namespace Application.Features.Places.Commands.DeleteLocation
{
    public class DeleteLocationCommandHandler : IRequestHandler<DeleteLocationCommand, Unit>
    {
        private readonly IDeleteLocationService _deleteLocationService;
        private readonly ILoggingService<DeleteLocationCommandHandler> _logger;

        public DeleteLocationCommandHandler(
            IDeleteLocationService deleteLocationService,
            ILoggingService<DeleteLocationCommandHandler> logger)
        {
            _deleteLocationService = deleteLocationService;
            _logger = logger;
        }

        public async Task<Unit> Handle(DeleteLocationCommand request, CancellationToken cancellationToken)
        {
            try
            {
                _logger.LogInformation($"[DeleteLocation] Starting to delete location with Id: {request.dto.Id}");

                await _deleteLocationService.DeleteAsync(request.dto, cancellationToken);

                _logger.LogInformation($"[DeleteLocation] Successfully deleted location with Id: {request.dto.Id}");
            }
            catch (Exception ex)
            {
                _logger.LogError($"[DeleteLocation] Failed to delete location with Id: {request.dto.Id}", ex);
                throw;
            }

            return Unit.Value;
        }
    }
}
