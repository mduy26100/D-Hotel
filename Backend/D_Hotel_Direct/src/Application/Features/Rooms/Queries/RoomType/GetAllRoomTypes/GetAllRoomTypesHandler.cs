using Application.Features.Rooms.DTOs;
using Application.Features.Rooms.Interfaces.Services.Query.RoomType.GetAllRoomTypes;
using MediatR;

namespace Application.Features.Rooms.Queries.RoomType.GetAllRoomTypes
{
    public class GetAllRoomTypesHandler : IRequestHandler<GetAllRoomTypesQuery, IEnumerable<RoomTypeDto>>
    {
        private readonly IGetAllRoomTypesService _getAllRoomTypesService;

        public GetAllRoomTypesHandler(IGetAllRoomTypesService getAllRoomTypesService)
        {
            _getAllRoomTypesService = getAllRoomTypesService;
        }

        public async Task<IEnumerable<RoomTypeDto>> Handle(GetAllRoomTypesQuery request, CancellationToken cancellationToken)
        {
            return await _getAllRoomTypesService.GetAllAsync(cancellationToken);
        }
    }
}
