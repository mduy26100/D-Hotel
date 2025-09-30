using Application.Features.Purposes.DTOs;
using MediatR;

namespace Application.Features.Purposes.Queries.RoomPurpose.GetRoomPurposeById
{
    public record GetRoomPurposeByIdQuery(int id) : IRequest<RoomPurposeDto>
    {
    }
}
