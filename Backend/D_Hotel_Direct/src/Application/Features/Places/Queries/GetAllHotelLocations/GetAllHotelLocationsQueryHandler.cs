using Application.Features.Places.DTOs;
using Application.Features.Places.Interfaces.Services.Query.GetAllHotelLocations;
using Application.Common.Interfaces.Logging;
using MediatR;

namespace Application.Features.Places.Queries.GetAllHotelLocations
{
    public class GetAllHotelLocationsQueryHandler : IRequestHandler<GetAllHotelLocationsQuery, IEnumerable<HotelLocationsDto>>
    {
        private readonly IGetAllHotelLocationsService _getAllHotelLocationsService;
        private readonly ILoggingService<GetAllHotelLocationsQueryHandler> _logger;

        public GetAllHotelLocationsQueryHandler(
            IGetAllHotelLocationsService getAllHotelLocationsService,
            ILoggingService<GetAllHotelLocationsQueryHandler> logger)
        {
            _getAllHotelLocationsService = getAllHotelLocationsService;
            _logger = logger;
        }

        public async Task<IEnumerable<HotelLocationsDto>> Handle(GetAllHotelLocationsQuery request, CancellationToken cancellationToken)
        {
            try
            {
                _logger.LogInformation("[GetAllHotelLocations] Fetching all hotel locations");

                var result = await _getAllHotelLocationsService.GetAllAsync(cancellationToken)
                             ?? Enumerable.Empty<HotelLocationsDto>();

                if (!result.Any())
                {
                    _logger.LogWarning("[GetAllHotelLocations] No hotel locations found");
                }
                else
                {
                    _logger.LogInformation($"[GetAllHotelLocations] Successfully fetched {result.Count()} hotel locations");
                }

                return result;
            }
            catch (Exception ex)
            {
                _logger.LogError("[GetAllHotelLocations] Error while fetching hotel locations", ex);
                throw;
            }
        }
    }
}
