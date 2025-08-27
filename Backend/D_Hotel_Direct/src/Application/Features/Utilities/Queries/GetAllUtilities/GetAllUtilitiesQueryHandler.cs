using Application.Features.Utilities.DTOs;
using Application.Features.Utilities.Interfaces.Services.Query.GetAllUtilities;
using Application.Common.Interfaces.Logging;
using MediatR;

namespace Application.Features.Utilities.Queries.GetAllUtilities
{
    public class GetAllUtilitiesQueryHandler : IRequestHandler<GetAllUtilitiesQuery, IEnumerable<UtilityDto>>
    {
        private readonly IGetAllUtilitiesService _getAllUtilitiesService;
        private readonly ILoggingService<GetAllUtilitiesQueryHandler> _logger;

        public GetAllUtilitiesQueryHandler(
            IGetAllUtilitiesService getAllUtilitiesService,
            ILoggingService<GetAllUtilitiesQueryHandler> logger)
        {
            _getAllUtilitiesService = getAllUtilitiesService;
            _logger = logger;
        }

        public async Task<IEnumerable<UtilityDto>> Handle(GetAllUtilitiesQuery request, CancellationToken cancellationToken)
        {
            try
            {
                _logger.LogInformation("[GetAllUtilities] Fetching all utilities");

                var result = await _getAllUtilitiesService.GetAllAsync(cancellationToken) ?? Enumerable.Empty<UtilityDto>();

                if (!result.Any())
                {
                    _logger.LogWarning("[GetAllUtilities] No utilities found");
                }
                else
                {
                    _logger.LogInformation($"[GetAllUtilities] Successfully fetched {result.Count()} utilities");
                }

                return result;
            }
            catch (Exception ex)
            {
                _logger.LogError("[GetAllUtilities] Error while fetching utilities", ex);
                throw;
            }
        }
    }
}