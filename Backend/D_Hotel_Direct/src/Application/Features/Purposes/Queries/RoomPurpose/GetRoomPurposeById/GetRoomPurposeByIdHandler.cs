using Application.Features.Purposes.DTOs;
using Application.Features.Purposes.Interfaces.Services.Query.RoomPurpose.GetRoomPurposeById;
using MediatR;

namespace Application.Features.Purposes.Queries.RoomPurpose.GetRoomPurposeById
{
    public class GetRoomPurposeByIdHandler : IRequestHandler<GetRoomPurposeByIdQuery, RoomPurposeDto>
    {
        private readonly IGetRoomPurposeByIdService _getRoomPurposeByIdService;

        public GetRoomPurposeByIdHandler(IGetRoomPurposeByIdService getRoomPurposeByIdService)
        {
            _getRoomPurposeByIdService = getRoomPurposeByIdService;
        }

        public async Task<RoomPurposeDto> Handle(GetRoomPurposeByIdQuery request, CancellationToken cancellationToken)
        {
            var roomPurpose = await _getRoomPurposeByIdService.GetByIdAsync(request.id, cancellationToken);
            return roomPurpose;
        }
    }
}
