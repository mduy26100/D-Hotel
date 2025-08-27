using Application.Features.Utilities.DTOs;
using MediatR;

namespace Application.Features.Utilities.Queries.GetUtilityByRoomId
{
    public record GetUtilityByRoomIdQuery(int roomId) : IRequest<IEnumerable<RoomUtilityDto>>;
}
