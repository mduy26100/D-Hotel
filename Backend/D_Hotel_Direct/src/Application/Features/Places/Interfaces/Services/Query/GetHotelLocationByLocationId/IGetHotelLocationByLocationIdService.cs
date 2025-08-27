using Application.Features.Places.DTOs;

namespace Application.Features.Places.Interfaces.Services.Query.GetHotelLocationByLocationId
{
    public interface IGetHotelLocationByLocationIdService
    {
        Task<IEnumerable<HotelLocationsDto>> GetByLocationIdAsync(int locationId, CancellationToken cancellationToken = default);
    }
}
