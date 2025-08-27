using Application.Features.Places.DTOs;
using Application.Features.Places.Interfaces.Services.Query.GetHotelLocationByHotelId;
using Application.Common.Interfaces.Logging;
using MediatR;

namespace Application.Features.Places.Queries.GetHotelLocationByHotelId
{
    public class GetHotelLocationByHotelIdQueryHandler : IRequestHandler<GetHotelLocationByHotelIdQuery, HotelLocationsDto?>
    {
        private readonly IGetHotelLocationByHotelIdService _getHotelLocationByHotelIdService;
        private readonly ILoggingService<GetHotelLocationByHotelIdQueryHandler> _logger;

        public GetHotelLocationByHotelIdQueryHandler(
            IGetHotelLocationByHotelIdService getHotelLocationByHotelIdService,
            ILoggingService<GetHotelLocationByHotelIdQueryHandler> logger)
        {
            _getHotelLocationByHotelIdService = getHotelLocationByHotelIdService;
            _logger = logger;
        }

        public async Task<HotelLocationsDto?> Handle(GetHotelLocationByHotelIdQuery request, CancellationToken cancellationToken)
        {
            try
            {
                _logger.LogInformation($"[GetHotelLocationByHotelId] Fetching location for HotelId: {request.hotelId}");

                var result = await _getHotelLocationByHotelIdService.GetByHotelIdAsync(request.hotelId, cancellationToken);

                if (result == null)
                {
                    _logger.LogWarning($"[GetHotelLocationByHotelId] No location found for HotelId: {request.hotelId}");
                }
                else
                {
                    _logger.LogInformation($"[GetHotelLocationByHotelId] Successfully fetched location for HotelId: {request.hotelId}");
                }

                return result;
            }
            catch (Exception ex)
            {
                _logger.LogError($"[GetHotelLocationByHotelId] Error while fetching location for HotelId: {request.hotelId}", ex);
                throw;
            }
        }
    }
}
