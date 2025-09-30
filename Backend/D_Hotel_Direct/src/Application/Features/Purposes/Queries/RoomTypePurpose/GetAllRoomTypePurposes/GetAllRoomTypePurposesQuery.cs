using Application.Features.Purposes.DTOs;
using MediatR;

namespace Application.Features.Purposes.Queries.RoomTypePurpose.GetAllRoomTypePurposes
{
    public record GetAllRoomTypePurposesQuery : IRequest<IEnumerable<RoomTypePurposeDto>>
    {
    }
}
