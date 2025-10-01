using Application.Features.Rooms.DTOs;
using MediatR;

namespace Application.Features.Rooms.Queries.RoomType.GetRoomTypeById
{
    public record GetRoomTypeByIdQuery(int id) : IRequest<RoomTypeDto>
    {
    }
}
