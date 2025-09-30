using Application.Features.Purposes.DTOs;
using Application.Features.Purposes.Interfaces.Services.Query.RoomTypePurpose.GetAllRoomTypePurposes;
using MediatR;

namespace Application.Features.Purposes.Queries.RoomTypePurpose.GetAllRoomTypePurposes
{
    public class GetAllRoomTypePurposesHandler : IRequestHandler<GetAllRoomTypePurposesQuery, IEnumerable<RoomTypePurposeDto>>
    {
        private readonly IGetAllRoomTypePurposesService _getAllRoomTypePurposesService;

        public GetAllRoomTypePurposesHandler(IGetAllRoomTypePurposesService getAllRoomTypePurposesService)
        {
            _getAllRoomTypePurposesService = getAllRoomTypePurposesService;
        }

        public async Task<IEnumerable<RoomTypePurposeDto>> Handle(GetAllRoomTypePurposesQuery request, CancellationToken cancellationToken)
        {
            var list = await _getAllRoomTypePurposesService.GetAllAsync(cancellationToken);
            return list;
        }
    }
}
