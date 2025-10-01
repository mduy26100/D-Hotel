using Application.Features.Rooms.DTOs;
using Application.Features.Rooms.Interfaces.Services.Query.RoomType.GetRoomTypeByQuantityGuestId;
using MediatR;

namespace Application.Features.Rooms.Queries.RoomType.GetRoomTypeByQuantityGuestId
{
    public class GetRoomTypeByQuantityGuestIdHandler : IRequestHandler<GetRoomTypeByQuantityGuestIdQuery, RoomTypeDto>
    {
        private readonly IGetRoomTypeByQuantityGuestIdService _getRoomTypeByQuantityGuestIdService;

        public GetRoomTypeByQuantityGuestIdHandler(IGetRoomTypeByQuantityGuestIdService getRoomTypeByQuantityGuestIdService)
        {
            _getRoomTypeByQuantityGuestIdService = getRoomTypeByQuantityGuestIdService;
        }

        public async Task<RoomTypeDto> Handle(GetRoomTypeByQuantityGuestIdQuery request, CancellationToken cancellationToken)
        {
            return await _getRoomTypeByQuantityGuestIdService.GetByQuantityGuestIdAsync(request.quantityGuestId, cancellationToken);
        }
    }
}
