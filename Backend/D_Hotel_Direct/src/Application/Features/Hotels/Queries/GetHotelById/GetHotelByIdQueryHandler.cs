using Application.Common.Interfaces.Logging;
using Application.Features.Hotels.DTOs;
using Application.Features.Hotels.Interfaces.Services.Query.GetHotelById;
using MediatR;

namespace Application.Features.Hotels.Queries.GetHotelById
{
    public class GetHotelByIdQueryHandler : IRequestHandler<GetHotelByIdQuery, HotelDto>
    {
        private readonly IGetHotelByIdService _getHotelByIdService;
        private readonly ILoggingService<GetHotelByIdQueryHandler> _logger;

        public GetHotelByIdQueryHandler(
            IGetHotelByIdService getHotelByIdService,
            ILoggingService<GetHotelByIdQueryHandler> logger)
        {
            _getHotelByIdService = getHotelByIdService;
            _logger = logger;
        }

        public async Task<HotelDto> Handle(GetHotelByIdQuery request, CancellationToken cancellationToken)
        {
            try
            {
                _logger.LogInformation($"[GetHotelById] Fetching hotel with Id: {request.Id}");

                var result = await _getHotelByIdService.GetByIdAsync(request.Id, cancellationToken);

                if (result == null)
                {
                    _logger.LogWarning($"[GetHotelById] Hotel not found with Id: {request.Id}");
                    throw new KeyNotFoundException($"Hotel not found with Id: {request.Id}");
                }

                _logger.LogInformation($"[GetHotelById] Successfully fetched HotelId: {request.Id}");
                return result;
            }
            catch (Exception ex)
            {
                _logger.LogError($"[GetHotelById] Error while fetching hotel with Id: {request.Id}", ex);
                throw;
            }
        }
    }
}
