using Application.Features.Places.DTOs;

namespace Application.Features.Places.Interfaces.Services.Query.GetLocationById
{
    public interface IGetLocationByIdService
    {
        Task<LocationsDto> GetByIdAsync(int id, CancellationToken cancellationToken = default);
    }
}
