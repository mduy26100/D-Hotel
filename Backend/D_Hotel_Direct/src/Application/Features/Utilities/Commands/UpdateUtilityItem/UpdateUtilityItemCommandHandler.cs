using Application.Features.Utilities.Interfaces.Services.Command.UpdateUtilityItem;
using Application.Common.Interfaces.Logging;
using MediatR;

namespace Application.Features.Utilities.Commands.UpdateUtilityItem
{
    public class UpdateUtilityItemCommandHandler : IRequestHandler<UpdateUtilityItemCommand, Unit>
    {
        private readonly IUpdateUtilityItemService _updateUtilityItemService;
        private readonly ILoggingService<UpdateUtilityItemCommandHandler> _logger;

        public UpdateUtilityItemCommandHandler(
            IUpdateUtilityItemService updateUtilityItemService,
            ILoggingService<UpdateUtilityItemCommandHandler> logger)
        {
            _updateUtilityItemService = updateUtilityItemService;
            _logger = logger;
        }

        public async Task<Unit> Handle(UpdateUtilityItemCommand request, CancellationToken cancellationToken)
        {
            try
            {
                _logger.LogInformation($"[UpdateUtilityItem] Start updating utility item with Id: {request.Dto.Id}, Name: {request.Dto.Name}");

                await _updateUtilityItemService.UpdateAsync(request.Dto, cancellationToken);

                _logger.LogInformation($"[UpdateUtilityItem] Successfully updated utility item with Id: {request.Dto.Id}, Name: {request.Dto.Name}");

                return Unit.Value;
            }
            catch (Exception ex)
            {
                _logger.LogError($"[UpdateUtilityItem] Error updating utility item with Id: {request.Dto.Id}, Name: {request.Dto.Name}", ex);
                throw;
            }
        }
    }
}