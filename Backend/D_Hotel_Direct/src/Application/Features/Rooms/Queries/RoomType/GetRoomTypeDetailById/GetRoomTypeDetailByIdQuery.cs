using Application.Features.Rooms.DTOs;
using MediatR;

namespace Application.Features.Rooms.Queries.RoomType.GetRoomTypeDetailById
{
    public record GetRoomTypeDetailByIdQuery(int roomTypeId) : IRequest<RoomTypeDetailDto?>
    {
    }
}
