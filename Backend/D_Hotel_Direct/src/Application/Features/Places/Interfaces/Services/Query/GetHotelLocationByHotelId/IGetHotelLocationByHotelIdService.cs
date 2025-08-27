using Application.Features.Places.DTOs;

namespace Application.Features.Places.Interfaces.Services.Query.GetHotelLocationByHotelId
{
    public interface IGetHotelLocationByHotelIdService
    {
        Task<HotelLocationsDto> GetByHotelIdAsync(int hotelId, CancellationToken cancellationToken = default);
    }
}
