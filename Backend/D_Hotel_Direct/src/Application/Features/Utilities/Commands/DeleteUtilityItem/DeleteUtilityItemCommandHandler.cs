using Application.Features.Utilities.Interfaces.Services.Command.DeleteUtilityItem;
using Application.Common.Interfaces.Logging;
using MediatR;

namespace Application.Features.Utilities.Commands.DeleteUtilityItem
{
    public class DeleteUtilityItemCommandHandler : IRequestHandler<DeleteUtilityItemCommand, Unit>
    {
        private readonly IDeleteUtilityItemService _deleteUtilityItemService;
        private readonly ILoggingService<DeleteUtilityItemCommandHandler> _logger;

        public DeleteUtilityItemCommandHandler(
            IDeleteUtilityItemService deleteUtilityItemService,
            ILoggingService<DeleteUtilityItemCommandHandler> logger)
        {
            _deleteUtilityItemService = deleteUtilityItemService;
            _logger = logger;
        }

        public async Task<Unit> Handle(DeleteUtilityItemCommand request, CancellationToken cancellationToken)
        {
            try
            {
                _logger.LogInformation($"[DeleteUtilityItem] Start deleting utility item with Id: {request.Dto.Id}, Name: {request.Dto.Name}");

                await _deleteUtilityItemService.DeleteAsync(request.Dto, cancellationToken);

                _logger.LogInformation($"[DeleteUtilityItem] Successfully deleted utility item with Id: {request.Dto.Id}, Name: {request.Dto.Name}");

                return Unit.Value;
            }
            catch (Exception ex)
            {
                _logger.LogError($"[DeleteUtilityItem] Error deleting utility item with Id: {request.Dto.Id}, Name: {request.Dto.Name}", ex);
                throw;
            }
        }
    }
}