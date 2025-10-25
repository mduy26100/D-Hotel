using Application.Common.Interfaces.Logging;
using Application.Features.Hotels.DTOs;
using Application.Features.Hotels.Interfaces.Services.Query.GetAllHotels;
using MediatR;

namespace Application.Features.Hotels.Queries.GetAllHotels
{
    public class GetAllHotelsQueryHandler : IRequestHandler<GetAllHotelsQuery, IEnumerable<HotelDetailDto>>
    {
        private readonly IGetAllHotelsService _getAllHotelsService;
        private readonly ILoggingService<GetAllHotelsQueryHandler> _logger;

        public GetAllHotelsQueryHandler(
            IGetAllHotelsService getAllHotelsService,
            ILoggingService<GetAllHotelsQueryHandler> logger)
        {
            _getAllHotelsService = getAllHotelsService;
            _logger = logger;
        }

        public async Task<IEnumerable<HotelDetailDto>> Handle(GetAllHotelsQuery request, CancellationToken cancellationToken)
        {
            try
            {
                _logger.LogInformation("[GetAllHotels] Fetching all hotels...");

                var result = await _getAllHotelsService.GetAllAsync(cancellationToken);

                _logger.LogInformation($"[GetAllHotels] Successfully fetched {result.Count()} hotels.");

                return result;
            }
            catch (Exception ex)
            {
                _logger.LogError("[GetAllHotels] Error while fetching hotels.", ex);
                throw;
            }
        }
    }
}
