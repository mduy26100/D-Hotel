using Application.Features.Rooms.DTOs;
using Application.Features.Rooms.Interfaces.Services.Query.RoomType.GetRoomTypeDetailById;
using MediatR;

namespace Application.Features.Rooms.Queries.RoomType.GetRoomTypeDetailById
{
    public class GetRoomTypeDetailByIdHandler : IRequestHandler<GetRoomTypeDetailByIdQuery, RoomTypeDetailDto?>
    {
        private readonly IGetRoomTypeDetailByIdService _getRoomTypeDetailByIdService;

        public GetRoomTypeDetailByIdHandler(IGetRoomTypeDetailByIdService getRoomTypeDetailByIdService)
        {
            _getRoomTypeDetailByIdService = getRoomTypeDetailByIdService;
        }

        public async Task<RoomTypeDetailDto?> Handle(GetRoomTypeDetailByIdQuery request, CancellationToken cancellationToken)
        {
            return await _getRoomTypeDetailByIdService.GetRoomTypeDetail(request.roomTypeId, cancellationToken);
        }
    }
}
