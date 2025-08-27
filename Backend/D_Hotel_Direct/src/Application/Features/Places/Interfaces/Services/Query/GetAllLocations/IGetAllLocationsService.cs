using Application.Features.Places.DTOs;

namespace Application.Features.Places.Interfaces.Services.Query.GetAllLocations
{
    public interface IGetAllLocationsService
    {
        Task<IEnumerable<LocationsDto>> GetAllAsync(CancellationToken cancellationToken = default);
    }
}
