using Application.Features.Purposes.DTOs;

namespace Application.Features.Purposes.Interfaces.Services.Query.HotelTravelPurpose.GetAllHotelTravelPurposes
{
    public interface IGetAllHotelTravelPurposesService
    {
        Task<IEnumerable<HotelTravelPurposeDto>> GetAllAsync(CancellationToken cancellationToken = default);
    }
}
