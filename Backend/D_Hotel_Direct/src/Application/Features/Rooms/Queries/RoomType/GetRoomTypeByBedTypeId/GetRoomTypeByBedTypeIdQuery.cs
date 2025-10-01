using Application.Features.Rooms.DTOs;
using MediatR;

namespace Application.Features.Rooms.Queries.RoomType.GetRoomTypeByBedTypeId
{
    public record GetRoomTypeByBedTypeIdQuery(int bedTypeId) : IRequest<RoomTypeDto>
    {
    }
}
