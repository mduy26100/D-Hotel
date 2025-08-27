using Application.Common.Interfaces.Logging;
using Application.Features.Hotels.DTOs;
using Application.Features.Hotels.Interfaces.Services.Query.GetAllHotelCategories;
using MediatR;

namespace Application.Features.Hotels.Queries.GetAllHotelCategories
{
    public class GetAllHotelCategoriesQueryHandler : IRequestHandler<GetAllHotelCategoriesQuery, IEnumerable<HotelCategoryDto>>
    {
        private readonly IGetAllHotelCategoriesService _getAllHotelCategoriesService;
        private readonly ILoggingService<GetAllHotelCategoriesQueryHandler> _logger;

        public GetAllHotelCategoriesQueryHandler(
            IGetAllHotelCategoriesService getAllHotelCategoriesService,
            ILoggingService<GetAllHotelCategoriesQueryHandler> logger)
        {
            _getAllHotelCategoriesService = getAllHotelCategoriesService;
            _logger = logger;
        }

        public async Task<IEnumerable<HotelCategoryDto>> Handle(GetAllHotelCategoriesQuery request, CancellationToken cancellationToken)
        {
            try
            {
                _logger.LogInformation("[GetAllHotelCategories] Fetching all hotel categories...");

                var result = await _getAllHotelCategoriesService.GetAllAsync(cancellationToken);

                _logger.LogInformation($"[GetAllHotelCategories] Successfully fetched {result.Count()} hotel categories.");

                return result;
            }
            catch (Exception ex)
            {
                _logger.LogError("[GetAllHotelCategories] Error while fetching hotel categories.", ex);
                throw;
            }
        }
    }
}
