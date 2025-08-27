using Application.Features.Utilities.Interfaces.Services.Command.DeleteUtility;
using Application.Common.Interfaces.Logging;
using MediatR;

namespace Application.Features.Utilities.Commands.DeleteUtility
{
    public class DeleteUtilityCommandHandler : IRequestHandler<DeleteUtilityCommand, Unit>
    {
        private readonly IDeleteUtilityService _deleteUtilityService;
        private readonly ILoggingService<DeleteUtilityCommandHandler> _logger;

        public DeleteUtilityCommandHandler(
            IDeleteUtilityService deleteUtilityService,
            ILoggingService<DeleteUtilityCommandHandler> logger)
        {
            _deleteUtilityService = deleteUtilityService;
            _logger = logger;
        }

        public async Task<Unit> Handle(DeleteUtilityCommand request, CancellationToken cancellationToken)
        {
            try
            {
                _logger.LogInformation($"[DeleteUtility] Start deleting utility with Id: {request.Dto.Id}, Name: {request.Dto.Name}");

                await _deleteUtilityService.DeleteAsync(request.Dto, cancellationToken);

                _logger.LogInformation($"[DeleteUtility] Successfully deleted utility with Id: {request.Dto.Id}, Name: {request.Dto.Name}");

                return Unit.Value;
            }
            catch (Exception ex)
            {
                _logger.LogError($"[DeleteUtility] Error deleting utility with Id: {request.Dto.Id}, Name: {request.Dto.Name}", ex);
                throw;
            }
        }
    }
}