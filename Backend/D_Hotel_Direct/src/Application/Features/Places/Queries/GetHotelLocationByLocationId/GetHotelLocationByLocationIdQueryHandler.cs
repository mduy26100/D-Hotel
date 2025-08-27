using Application.Features.Places.DTOs;
using Application.Features.Places.Interfaces.Services.Query.GetHotelLocationByLocationId;
using Application.Common.Interfaces.Logging;
using MediatR;

namespace Application.Features.Places.Queries.GetHotelLocationByLocationId
{
    public class GetHotelLocationByLocationIdQueryHandler : IRequestHandler<GetHotelLocationByLocationIdQuery, IEnumerable<HotelLocationsDto>>
    {
        private readonly IGetHotelLocationByLocationIdService _getHotelLocationByLocationIdService;
        private readonly ILoggingService<GetHotelLocationByLocationIdQueryHandler> _logger;

        public GetHotelLocationByLocationIdQueryHandler(
            IGetHotelLocationByLocationIdService getHotelLocationByLocationIdService,
            ILoggingService<GetHotelLocationByLocationIdQueryHandler> logger)
        {
            _getHotelLocationByLocationIdService = getHotelLocationByLocationIdService;
            _logger = logger;
        }

        public async Task<IEnumerable<HotelLocationsDto>> Handle(GetHotelLocationByLocationIdQuery request, CancellationToken cancellationToken)
        {
            try
            {
                _logger.LogInformation($"[GetHotelLocationByLocationId] Fetching hotel locations for LocationId: {request.locationId}");

                var result = await _getHotelLocationByLocationIdService.GetByLocationIdAsync(request.locationId, cancellationToken);

                if (result == null || !result.Any())
                {
                    _logger.LogWarning($"[GetHotelLocationByLocationId] No hotel locations found for LocationId: {request.locationId}");
                    return Enumerable.Empty<HotelLocationsDto>();
                }

                _logger.LogInformation($"[GetHotelLocationByLocationId] Successfully fetched {result.Count()} hotel locations for LocationId: {request.locationId}");
                return result;
            }
            catch (Exception ex)
            {
                _logger.LogError($"[GetHotelLocationByLocationId] Error while fetching hotel locations for LocationId: {request.locationId}", ex);
                throw;
            }
        }
    }
}
