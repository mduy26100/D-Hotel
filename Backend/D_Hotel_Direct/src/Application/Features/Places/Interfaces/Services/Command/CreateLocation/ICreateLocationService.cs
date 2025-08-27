using Application.Features.Places.DTOs;

namespace Application.Features.Places.Interfaces.Services.Command.CreateLocation
{
    public interface ICreateLocationService
    {
        Task<LocationsDto> CreateAsync(UpsertLocationRequest request, CancellationToken cancellationToken = default);
    }
}
