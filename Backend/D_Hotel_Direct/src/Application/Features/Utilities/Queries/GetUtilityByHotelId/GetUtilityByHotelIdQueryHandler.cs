using Application.Features.Utilities.DTOs;
using Application.Features.Utilities.Interfaces.Services.Query.GetUtilityByHotelId;
using Application.Common.Interfaces.Logging;
using MediatR;

namespace Application.Features.Utilities.Queries.GetUtilityByHotelId
{
    public class GetUtilityByHotelIdQueryHandler : IRequestHandler<GetUtilityByHotelIdQuery, IEnumerable<HotelUtilityDto>>
    {
        private readonly IGetUtilityByHotelIdService _getUtilityItemsByHotelIdService;
        private readonly ILoggingService<GetUtilityByHotelIdQueryHandler> _logger;

        public GetUtilityByHotelIdQueryHandler(
            IGetUtilityByHotelIdService getUtilityItemsByHotelIdService,
            ILoggingService<GetUtilityByHotelIdQueryHandler> logger)
        {
            _getUtilityItemsByHotelIdService = getUtilityItemsByHotelIdService;
            _logger = logger;
        }

        public async Task<IEnumerable<HotelUtilityDto>> Handle(GetUtilityByHotelIdQuery request, CancellationToken cancellationToken)
        {
            try
            {
                _logger.LogInformation($"[GetUtilityByHotelId] Fetching utilities for HotelId: {request.hotelId}");

                var result = await _getUtilityItemsByHotelIdService.GetByIdAsync(request.hotelId, cancellationToken) ?? Enumerable.Empty<HotelUtilityDto>();

                if (!result.Any())
                {
                    _logger.LogWarning($"[GetUtilityByHotelId] No utilities found for HotelId: {request.hotelId}");
                }
                else
                {
                    _logger.LogInformation($"[GetUtilityByHotelId] Successfully fetched {result.Count()} utilities for HotelId: {request.hotelId}");
                }

                return result;
            }
            catch (Exception ex)
            {
                _logger.LogError($"[GetUtilityByHotelId] Error while fetching utilities for HotelId: {request.hotelId}", ex);
                throw;
            }
        }
    }
}