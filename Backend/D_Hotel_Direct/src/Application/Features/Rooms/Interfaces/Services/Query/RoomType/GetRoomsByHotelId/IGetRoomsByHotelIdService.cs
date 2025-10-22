using Application.Features.Rooms.DTOs;

namespace Application.Features.Rooms.Interfaces.Services.Query.RoomType.GetRoomsByHotelId
{
    public interface IGetRoomsByHotelIdService
    {
        Task<IEnumerable<RoomTypeDto>> GetRoomsByHotelId(int hotelId, 
            string? priceType = null,
            DateTime? startDate = null,
            DateTime? endDate = null,
            TimeSpan? checkInTime = null,
            int? usageHours = null,
            CancellationToken cancellationToken = default);
    }
}
