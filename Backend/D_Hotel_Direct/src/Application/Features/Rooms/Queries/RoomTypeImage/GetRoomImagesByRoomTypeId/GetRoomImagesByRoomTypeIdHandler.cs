using Application.Features.Rooms.DTOs;
using Application.Features.Rooms.Interfaces.Services.Query.RoomTypeImage.GetRoomImagesByRoomTypeId;
using MediatR;

namespace Application.Features.Rooms.Queries.RoomTypeImage.GetRoomImagesByRoomTypeId
{
    public class GetRoomImagesByRoomTypeIdHandler : IRequestHandler<GetRoomImagesByRoomTypeIdQuery, IEnumerable<RoomTypeImageDto>>
    {
        private readonly IGetRoomImagesByRoomTypeIdService _getRoomImagesByRoomTypeIdService;

        public GetRoomImagesByRoomTypeIdHandler(IGetRoomImagesByRoomTypeIdService getRoomImagesByRoomTypeIdService)
        {
            _getRoomImagesByRoomTypeIdService = getRoomImagesByRoomTypeIdService;
        }

        public async Task<IEnumerable<RoomTypeImageDto>> Handle(GetRoomImagesByRoomTypeIdQuery request, CancellationToken cancellationToken)
        {
            return await _getRoomImagesByRoomTypeIdService.GetByRoomTypeIdAsync(request.roomTypeId, cancellationToken);
        }
    }
}
