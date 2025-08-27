using Application.Features.Utilities.DTOs;
using Application.Features.Utilities.Interfaces.Services.Command.CreateUtilityItem;
using Application.Common.Interfaces.Logging;
using MediatR;

namespace Application.Features.Utilities.Commands.CreateUtilityItem
{
    public class CreateUtilityItemCommandHandler : IRequestHandler<CreateUtilityItemCommand, UtilityItemDto>
    {
        private readonly ICreateUtilityItemService _createUtilityItemService;
        private readonly ILoggingService<CreateUtilityItemCommandHandler> _logger;

        public CreateUtilityItemCommandHandler(
            ICreateUtilityItemService createUtilityItemService,
            ILoggingService<CreateUtilityItemCommandHandler> logger)
        {
            _createUtilityItemService = createUtilityItemService;
            _logger = logger;
        }

        public async Task<UtilityItemDto> Handle(CreateUtilityItemCommand request, CancellationToken cancellationToken)
        {
            try
            {
                _logger.LogInformation($"[CreateUtilityItem] Start creating utility item with Name: {request.Dto.Name}");

                var result = await _createUtilityItemService.CreateAsync(request.Dto, cancellationToken);

                _logger.LogInformation($"[CreateUtilityItem] Successfully created utility item with Id: {result.Id}, Name: {result.Name}");

                return result;
            }
            catch (Exception ex)
            {
                _logger.LogError($"[CreateUtilityItem] Error creating utility item with Name: {request.Dto.Name}", ex);
                throw;
            }
        }
    }
}