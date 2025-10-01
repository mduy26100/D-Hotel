using Application.Features.Rooms.DTOs;
using MediatR;

namespace Application.Features.Rooms.Queries.RoomType.GetAllRoomTypes
{
    public record GetAllRoomTypesQuery() : IRequest<IEnumerable<RoomTypeDto>>
    {
    }
}
