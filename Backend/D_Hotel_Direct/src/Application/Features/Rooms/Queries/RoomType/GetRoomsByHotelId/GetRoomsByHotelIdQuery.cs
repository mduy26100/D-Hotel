using Application.Features.Rooms.DTOs;
using MediatR;

namespace Application.Features.Rooms.Queries.RoomType.GetRoomsByHotelId
{
    public record GetRoomsByHotelIdQuery(int hotelId,
            string? priceType = null,
            DateTime? startDate = null,
            DateTime? endDate = null,
            TimeSpan? checkInTime = null,
            int? usageHours = null) : IRequest<IEnumerable<RoomTypeDto>>
    {
    }
}
