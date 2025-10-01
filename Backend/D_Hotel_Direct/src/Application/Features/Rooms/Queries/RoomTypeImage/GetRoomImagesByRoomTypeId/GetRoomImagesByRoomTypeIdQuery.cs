using Application.Features.Rooms.DTOs;
using MediatR;

namespace Application.Features.Rooms.Queries.RoomTypeImage.GetRoomImagesByRoomTypeId
{
    public record GetRoomImagesByRoomTypeIdQuery(int roomTypeId) : IRequest<IEnumerable<RoomTypeImageDto>>
    {
    }
}
