using Application.Features.Utilities.DTOs;
using Application.Features.Utilities.Interfaces.Services.Query.GetUtilityByRoomId;
using Application.Common.Interfaces.Logging;
using MediatR;

namespace Application.Features.Utilities.Queries.GetUtilityByRoomId
{
    public class GetUtilityByRoomIdQueryHandler : IRequestHandler<GetUtilityByRoomIdQuery, IEnumerable<RoomUtilityDto>>
    {
        private readonly IGetUtilityByRoomIdService _getUtilityItemsByRoomIdService;
        private readonly ILoggingService<GetUtilityByRoomIdQueryHandler> _logger;

        public GetUtilityByRoomIdQueryHandler(
            IGetUtilityByRoomIdService getUtilityItemsByRoomIdService,
            ILoggingService<GetUtilityByRoomIdQueryHandler> logger)
        {
            _getUtilityItemsByRoomIdService = getUtilityItemsByRoomIdService;
            _logger = logger;
        }

        public async Task<IEnumerable<RoomUtilityDto>> Handle(GetUtilityByRoomIdQuery request, CancellationToken cancellationToken)
        {
            try
            {
                _logger.LogInformation($"[GetUtilityByRoomId] Fetching utilities for RoomId: {request.roomId}");

                var result = await _getUtilityItemsByRoomIdService.GetByIdAsync(request.roomId, cancellationToken) ?? Enumerable.Empty<RoomUtilityDto>();

                if (!result.Any())
                {
                    _logger.LogWarning($"[GetUtilityByRoomId] No utilities found for RoomId: {request.roomId}");
                }
                else
                {
                    _logger.LogInformation($"[GetUtilityByRoomId] Successfully fetched {result.Count()} utilities for RoomId: {request.roomId}");
                }

                return result;
            }
            catch (Exception ex)
            {
                _logger.LogError($"[GetUtilityByRoomId] Error while fetching utilities for RoomId: {request.roomId}", ex);
                throw;
            }
        }
    }
}