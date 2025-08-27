using Application.Features.Utilities.DTOs;
using Application.Features.Utilities.Interfaces.Services.Query.GetUtilityByRoomId;
using MediatR;

namespace Application.Features.Utilities.Queries.GetUtilityByRoomId
{
    public class GetUtilityByRoomIdQueryHandler : IRequestHandler<GetUtilityByRoomIdQuery, IEnumerable<RoomUtilityDto>>
    {
        private readonly IGetUtilityByRoomIdService _getUtilityItemsByRoomIdService;

        public GetUtilityByRoomIdQueryHandler(IGetUtilityByRoomIdService getUtilityItemsByRoomIdService)
        {
            _getUtilityItemsByRoomIdService = getUtilityItemsByRoomIdService;
        }

        public async Task<IEnumerable<RoomUtilityDto>> Handle(GetUtilityByRoomIdQuery request, CancellationToken cancellationToken)
        {
            return await _getUtilityItemsByRoomIdService.GetByIdAsync(request.roomId, cancellationToken);
        }
    }
}
