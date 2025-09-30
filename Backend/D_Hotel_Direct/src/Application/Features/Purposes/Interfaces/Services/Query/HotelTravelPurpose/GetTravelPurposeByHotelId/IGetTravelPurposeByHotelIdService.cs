using Application.Features.Purposes.DTOs;

namespace Application.Features.Purposes.Interfaces.Services.Query.HotelTravelPurpose.GetTravelPurposeByHotelId
{
    public interface IGetTravelPurposeByHotelIdService
    {
        Task<HotelTravelPurposeDto> GetTravelPurposeByHotelIdAsync(int hotelId, CancellationToken cancellationToken = default);
    }
}
