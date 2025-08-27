using Application.Features.Utilities.DTOs;
using Application.Features.Utilities.Interfaces.Services.Query.GetUtilityItemsByUtilityId;
using Application.Common.Interfaces.Logging;
using MediatR;

namespace Application.Features.Utilities.Queries.GetUtilityItemsByUtilityId
{
    public class GetUtilityItemsByUtilityIdQueryHandler : IRequestHandler<GetUtilityItemsByUtilityIdQuery, IEnumerable<UtilityItemDto>>
    {
        private readonly IGetUtilityItemsByUtilityIdService _getUtilityItemsByUtilityIdService;
        private readonly ILoggingService<GetUtilityItemsByUtilityIdQueryHandler> _logger;

        public GetUtilityItemsByUtilityIdQueryHandler(
            IGetUtilityItemsByUtilityIdService getUtilityItemsByUtilityIdService,
            ILoggingService<GetUtilityItemsByUtilityIdQueryHandler> logger)
        {
            _getUtilityItemsByUtilityIdService = getUtilityItemsByUtilityIdService;
            _logger = logger;
        }

        public async Task<IEnumerable<UtilityItemDto>> Handle(GetUtilityItemsByUtilityIdQuery request, CancellationToken cancellationToken)
        {
            try
            {
                _logger.LogInformation($"[GetUtilityItemsByUtilityId] Fetching utility items for UtilityId: {request.utilityId}");

                var result = await _getUtilityItemsByUtilityIdService.GetByUtilityIdAsync(request.utilityId, cancellationToken) ?? Enumerable.Empty<UtilityItemDto>();

                if (!result.Any())
                {
                    _logger.LogWarning($"[GetUtilityItemsByUtilityId] No utility items found for UtilityId: {request.utilityId}");
                }
                else
                {
                    _logger.LogInformation($"[GetUtilityItemsByUtilityId] Successfully fetched {result.Count()} utility items for UtilityId: {request.utilityId}");
                }

                return result;
            }
            catch (Exception ex)
            {
                _logger.LogError($"[GetUtilityItemsByUtilityId] Error while fetching utility items for UtilityId: {request.utilityId}", ex);
                throw;
            }
        }
    }
}