using Application.Features.Utilities.DTOs;
using Application.Features.Utilities.Interfaces.Services.Query.GetUtilityById;
using Application.Common.Interfaces.Logging;
using MediatR;

namespace Application.Features.Utilities.Queries.GetUtilityById
{
    public class GetUtilityByIdQueryHandler : IRequestHandler<GetUtilityByIdQuery, UtilityDto?>
    {
        private readonly IGetUtilityByIdService _getUtilityByIdService;
        private readonly ILoggingService<GetUtilityByIdQueryHandler> _logger;

        public GetUtilityByIdQueryHandler(
            IGetUtilityByIdService getUtilityByIdService,
            ILoggingService<GetUtilityByIdQueryHandler> logger)
        {
            _getUtilityByIdService = getUtilityByIdService;
            _logger = logger;
        }

        public async Task<UtilityDto?> Handle(GetUtilityByIdQuery request, CancellationToken cancellationToken)
        {
            try
            {
                _logger.LogInformation($"[GetUtilityById] Fetching utility with Id: {request.Id}");

                var result = await _getUtilityByIdService.GetByIdAsync(request.Id, cancellationToken);

                if (result == null)
                {
                    _logger.LogWarning($"[GetUtilityById] No utility found with Id: {request.Id}");
                }
                else
                {
                    _logger.LogInformation($"[GetUtilityById] Successfully fetched utility with Id: {request.Id}");
                }

                return result;
            }
            catch (Exception ex)
            {
                _logger.LogError($"[GetUtilityById] Error while fetching utility with Id: {request.Id}", ex);
                throw;
            }
        }
    }
}