using Application.Features.Purposes.DTOs;
using Application.Features.Purposes.Interfaces.Services.Query.RoomPurpose.GetAllRoomPurposes;
using MediatR;

namespace Application.Features.Purposes.Queries.RoomPurpose.GetAllRoomPurposes
{
    public class GetAllRoomPurposesHandler : IRequestHandler<GetAllRoomPurposesQuery, IEnumerable<RoomPurposeDto>>
    {
        private readonly IGetAllRoomPurposesService _getAllRoomPurposesService;

        public GetAllRoomPurposesHandler(IGetAllRoomPurposesService getAllRoomPurposesService)
        {
            _getAllRoomPurposesService = getAllRoomPurposesService;
        }

        public async Task<IEnumerable<RoomPurposeDto>> Handle(GetAllRoomPurposesQuery request, CancellationToken cancellationToken)
        {
            var list = await _getAllRoomPurposesService.GetAllAsync(cancellationToken);
            return list;
        }
    }
}
