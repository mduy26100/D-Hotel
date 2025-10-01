using Application.Features.Rooms.DTOs;
using Application.Features.Rooms.Interfaces.Services.Query.RoomType.GetRoomTypeById;
using MediatR;

namespace Application.Features.Rooms.Queries.RoomType.GetRoomTypeById
{
    public class GetRoomTypeByIdHandler : IRequestHandler<GetRoomTypeByIdQuery, RoomTypeDto>
    {
        private readonly IGetRoomTypeByIdService _getRoomTypeByIdService;

        public GetRoomTypeByIdHandler(IGetRoomTypeByIdService getRoomTypeByIdService)
        {
            _getRoomTypeByIdService = getRoomTypeByIdService;
        }

        public async Task<RoomTypeDto> Handle(GetRoomTypeByIdQuery request, CancellationToken cancellationToken)
        {
            return await _getRoomTypeByIdService.GetByIdAsync(request.id, cancellationToken);
        }
    }
}
