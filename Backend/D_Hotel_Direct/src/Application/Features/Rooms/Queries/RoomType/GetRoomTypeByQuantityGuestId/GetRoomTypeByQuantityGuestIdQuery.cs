using Application.Features.Rooms.DTOs;
using MediatR;

namespace Application.Features.Rooms.Queries.RoomType.GetRoomTypeByQuantityGuestId
{
    public record GetRoomTypeByQuantityGuestIdQuery(int quantityGuestId) : IRequest<RoomTypeDto>
    {
    }
}
