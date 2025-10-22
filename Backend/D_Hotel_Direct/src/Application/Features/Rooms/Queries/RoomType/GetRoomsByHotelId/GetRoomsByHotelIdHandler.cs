using Application.Features.Rooms.DTOs;
using Application.Features.Rooms.Interfaces.Services.Query.RoomType.GetRoomsByHotelId;
using MediatR;

namespace Application.Features.Rooms.Queries.RoomType.GetRoomsByHotelId
{
    public class GetRoomsByHotelIdHandler : IRequestHandler<GetRoomsByHotelIdQuery, IEnumerable<RoomTypeDto>>
    {
        private readonly IGetRoomsByHotelIdService _getRoomsByHotelIdService;

        public GetRoomsByHotelIdHandler(IGetRoomsByHotelIdService getRoomsByHotelIdService)
        {
            _getRoomsByHotelIdService = getRoomsByHotelIdService;
        }

        public async Task<IEnumerable<RoomTypeDto>> Handle(GetRoomsByHotelIdQuery request, CancellationToken cancellationToken)
        {
            return await _getRoomsByHotelIdService.GetRoomsByHotelId(request.hotelId, 
                request.priceType, 
                request.startDate,
                request.endDate,
                request.checkInTime,
                request.usageHours,
                cancellationToken);
        }
    }
}
