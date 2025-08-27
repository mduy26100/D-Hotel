using Application.Features.Places.DTOs;
using Application.Features.Places.Interfaces.Services.Query.GetAllLocations;
using Application.Common.Interfaces.Logging;
using MediatR;

namespace Application.Features.Places.Queries.GetAllLocations
{
    public class GetAllLocationsQueryHandler : IRequestHandler<GetAllLocationsQuery, IEnumerable<LocationsDto>>
    {
        private readonly IGetAllLocationsService _getAllLocationsService;
        private readonly ILoggingService<GetAllLocationsQueryHandler> _logger;

        public GetAllLocationsQueryHandler(
            IGetAllLocationsService getAllLocationsService,
            ILoggingService<GetAllLocationsQueryHandler> logger)
        {
            _getAllLocationsService = getAllLocationsService;
            _logger = logger;
        }

        public async Task<IEnumerable<LocationsDto>> Handle(GetAllLocationsQuery request, CancellationToken cancellationToken)
        {
            try
            {
                _logger.LogInformation("[GetAllLocations] Fetching all locations");

                var result = await _getAllLocationsService.GetAllAsync(cancellationToken)
                             ?? Enumerable.Empty<LocationsDto>();

                if (!result.Any())
                {
                    _logger.LogWarning("[GetAllLocations] No locations found");
                }
                else
                {
                    _logger.LogInformation($"[GetAllLocations] Successfully fetched {result.Count()} locations");
                }

                return result;
            }
            catch (Exception ex)
            {
                _logger.LogError("[GetAllLocations] Error while fetching locations", ex);
                throw;
            }
        }
    }
}
