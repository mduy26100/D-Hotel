using Application.Features.Purposes.DTOs;
using Application.Features.Purposes.Interfaces.Services.Query.RoomTypePurpose.GetRoomPurposeByRoomId;
using MediatR;

namespace Application.Features.Purposes.Queries.RoomTypePurpose.GetRoomPurposeByRoomId
{
    public class GetRoomPurposeByRoomIdHandler : IRequestHandler<GetRoomPurposeByRoomIdQuery, RoomTypePurposeDto>
    {
        private readonly IGetRoomPurposeByRoomIdService _getRoomPurposeByRoomIdService;

        public GetRoomPurposeByRoomIdHandler(IGetRoomPurposeByRoomIdService getRoomPurposeByRoomIdService)
        {
            _getRoomPurposeByRoomIdService = getRoomPurposeByRoomIdService;
        }

        public async Task<RoomTypePurposeDto> Handle(GetRoomPurposeByRoomIdQuery request, CancellationToken cancellationToken)
        {
            var roomTypePurpose = await _getRoomPurposeByRoomIdService.GetRoomPurposeByRoomId(request.roomId, cancellationToken);
            return roomTypePurpose;
        }
    }
}
