using Application.Features.Purposes.DTOs;
using MediatR;

namespace Application.Features.Purposes.Queries.RoomPurpose.GetAllRoomPurposes
{
    public record GetAllRoomPurposesQuery() : IRequest<IEnumerable<RoomPurposeDto>>
    {
    }
}
