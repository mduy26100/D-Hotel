using Application.Features.Rooms.DTOs;
using Application.Features.Rooms.Interfaces.Services.Query.RoomType.GetRoomTypeByBedTypeId;
using MediatR;

namespace Application.Features.Rooms.Queries.RoomType.GetRoomTypeByBedTypeId
{
    public class GetRoomTypeByBedTypeIdHandler : IRequestHandler<GetRoomTypeByBedTypeIdQuery, RoomTypeDto>
    {
        private readonly IGetRoomTypeByBedTypeIdService _getRoomTypeByBedTypeIdService;

        public GetRoomTypeByBedTypeIdHandler(IGetRoomTypeByBedTypeIdService getRoomTypeByBedTypeIdService)
        {
            _getRoomTypeByBedTypeIdService = getRoomTypeByBedTypeIdService;
        }

        public async Task<RoomTypeDto> Handle(GetRoomTypeByBedTypeIdQuery request, CancellationToken cancellationToken)
        {
            return await _getRoomTypeByBedTypeIdService.GetByBedTypeIdAsync(request.bedTypeId, cancellationToken);
        }
    }
}
