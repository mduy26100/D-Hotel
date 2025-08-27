using Application.Features.Places.DTOs;
using Application.Features.Places.Interfaces.Services.Query.GetLocationById;
using Application.Common.Interfaces.Logging;
using MediatR;

namespace Application.Features.Places.Queries.GetLocationById
{
    public class GetLocationByIdQueryHandler : IRequestHandler<GetLocationByIdQuery, LocationsDto>
    {
        private readonly IGetLocationByIdService _getLocationByIdService;
        private readonly ILoggingService<GetLocationByIdQueryHandler> _logger;

        public GetLocationByIdQueryHandler(
            IGetLocationByIdService getLocationByIdService,
            ILoggingService<GetLocationByIdQueryHandler> logger)
        {
            _getLocationByIdService = getLocationByIdService;
            _logger = logger;
        }

        public async Task<LocationsDto> Handle(GetLocationByIdQuery request, CancellationToken cancellationToken)
        {
            try
            {
                _logger.LogInformation($"[GetLocationById] Fetching location with Id: {request.id}");

                var result = await _getLocationByIdService.GetByIdAsync(request.id, cancellationToken);

                if (result == null)
                {
                    _logger.LogWarning($"[GetLocationById] No location found with Id: {request.id}");
                }
                else
                {
                    _logger.LogInformation($"[GetLocationById] Successfully fetched location with Id: {request.id}");
                }

                return result!;
            }
            catch (Exception ex)
            {
                _logger.LogError($"[GetLocationById] Error while fetching location with Id: {request.id}", ex);
                throw;
            }
        }
    }
}
