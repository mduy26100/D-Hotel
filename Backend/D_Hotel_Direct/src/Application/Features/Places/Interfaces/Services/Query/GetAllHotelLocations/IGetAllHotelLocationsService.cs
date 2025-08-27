using Application.Features.Places.DTOs;

namespace Application.Features.Places.Interfaces.Services.Query.GetAllHotelLocations
{
    public interface IGetAllHotelLocationsService
    {
        Task<IEnumerable<HotelLocationsDto>> GetAllAsync(CancellationToken cancellationToken = default);
    }
}
