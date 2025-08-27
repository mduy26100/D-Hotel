using Application.Common.Interfaces.Logging;
using Application.Features.Hotels.DTOs;
using Application.Features.Hotels.Interfaces.Services.Query.GetHotelCategoryById;
using MediatR;

namespace Application.Features.Hotels.Queries.GetHotelCategoryById
{
    public class GetHotelCategoryByIdQueryHandler : IRequestHandler<GetHotelCategoryByIdQuery, HotelCategoryDto>
    {
        private readonly IGetHotelCategoryByIdService _getHotelCategoryByIdService;
        private readonly ILoggingService<GetHotelCategoryByIdQueryHandler> _logger;

        public GetHotelCategoryByIdQueryHandler(
            IGetHotelCategoryByIdService getHotelCategoryByIdService,
            ILoggingService<GetHotelCategoryByIdQueryHandler> logger)
        {
            _getHotelCategoryByIdService = getHotelCategoryByIdService;
            _logger = logger;
        }

        public async Task<HotelCategoryDto> Handle(GetHotelCategoryByIdQuery request, CancellationToken cancellationToken)
        {
            try
            {
                _logger.LogInformation($"[GetHotelCategoryById] Fetching hotel category with Id: {request.Id}");

                var result = await _getHotelCategoryByIdService.GetByIdAsync(request.Id, cancellationToken);

                if (result == null)
                {
                    _logger.LogWarning($"[GetHotelCategoryById] Hotel category not found with Id: {request.Id}");
                    throw new KeyNotFoundException($"Hotel category not found with Id: {request.Id}");
                }

                _logger.LogInformation($"[GetHotelCategoryById] Successfully fetched HotelCategoryId: {request.Id}");
                return result;
            }
            catch (Exception ex)
            {
                _logger.LogError($"[GetHotelCategoryById] Error while fetching hotel category with Id: {request.Id}", ex);
                throw;
            }
        }
    }
}
