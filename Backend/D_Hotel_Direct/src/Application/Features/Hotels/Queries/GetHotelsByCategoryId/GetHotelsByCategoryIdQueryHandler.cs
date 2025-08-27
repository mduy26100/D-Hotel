using Application.Common.Interfaces.Logging;
using Application.Features.Hotels.DTOs;
using Application.Features.Hotels.Interfaces.Services.Query.GetHotelCategoryById;
using MediatR;

namespace Application.Features.Hotels.Queries.GetHotelsByCategoryId
{
    public class GetHotelsByCategoryIdQueryHandler : IRequestHandler<GetHotelsByCategoryIdQuery, IEnumerable<HotelDto>>
    {
        private readonly IGetHotelsByCategoryIdService _getHotelsByCategoryIdService;
        private readonly ILoggingService<GetHotelsByCategoryIdQueryHandler> _logger;

        public GetHotelsByCategoryIdQueryHandler(
            IGetHotelsByCategoryIdService getHotelsByCategoryIdService,
            ILoggingService<GetHotelsByCategoryIdQueryHandler> logger)
        {
            _getHotelsByCategoryIdService = getHotelsByCategoryIdService;
            _logger = logger;
        }

        public async Task<IEnumerable<HotelDto>> Handle(GetHotelsByCategoryIdQuery request, CancellationToken cancellationToken)
        {
            try
            {
                _logger.LogInformation($"[GetHotelsByCategoryId] Fetching hotels for CategoryId: {request.CategoryId}");

                var result = await _getHotelsByCategoryIdService.GetHotelsByCategoryIdAsync(request.CategoryId, cancellationToken);

                if (result == null || !result.Any())
                {
                    _logger.LogWarning($"[GetHotelsByCategoryId] No hotels found for CategoryId: {request.CategoryId}");
                    return Enumerable.Empty<HotelDto>();
                }

                _logger.LogInformation($"[GetHotelsByCategoryId] Successfully fetched {result.Count()} hotels for CategoryId: {request.CategoryId}");
                return result;
            }
            catch (Exception ex)
            {
                _logger.LogError($"[GetHotelsByCategoryId] Error while fetching hotels for CategoryId: {request.CategoryId}", ex);
                throw;
            }
        }
    }
}
