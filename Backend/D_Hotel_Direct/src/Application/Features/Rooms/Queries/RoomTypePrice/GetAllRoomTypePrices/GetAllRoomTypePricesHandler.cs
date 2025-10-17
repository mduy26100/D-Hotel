using Application.Features.Rooms.DTOs;
using Application.Features.Rooms.Interfaces.Services.Query.RoomTypePrice.GetAllRoomTypePrices;
using MediatR;

namespace Application.Features.Rooms.Queries.RoomTypePrice.GetAllRoomTypePrices
{
    public class GetAllRoomTypePricesHandler : IRequestHandler<GetAllRoomTypePricesQuery, IEnumerable<RoomTypePriceDto>>
    {
        private readonly IGetAllRoomTypePricesService _getAllRoomTypePricesService;

        public GetAllRoomTypePricesHandler(IGetAllRoomTypePricesService getAllRoomTypePricesService)
        {
            _getAllRoomTypePricesService = getAllRoomTypePricesService;
        }

        public async Task<IEnumerable<RoomTypePriceDto>> Handle(GetAllRoomTypePricesQuery request, CancellationToken cancellationToken)
        {
            return await _getAllRoomTypePricesService.GetAllAsync(cancellationToken);
        }
    }
}
