using Application.Features.Purposes.DTOs;
using MediatR;

namespace Application.Features.Purposes.Queries.RoomTypePurpose.GetRoomPurposeByRoomId
{
    public record GetRoomPurposeByRoomIdQuery(int roomId) : IRequest<RoomTypePurposeDto>
    {
    }
}
