using Application.Features.Hotels.DTOs;

namespace Application.Features.Purposes.Interfaces.Services.Query.HotelTravelPurpose.GetHotelsByTravelPurposeId
{
    public interface IGetHotelsByTravelPurposeIdService
    {
        Task<IEnumerable<HotelDto>> GetHotelsByTravelPurposeIdAsync(int travelPurposeId, CancellationToken cancellationToken = default);
    }
}
