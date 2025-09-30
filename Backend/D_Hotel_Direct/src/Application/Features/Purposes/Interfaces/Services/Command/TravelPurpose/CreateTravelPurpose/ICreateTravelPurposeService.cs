using Application.Features.Purposes.DTOs;

namespace Application.Features.Purposes.Interfaces.Services.Command.TravelPurpose.CreateTravelPurpose
{
    public interface ICreateTravelPurposeService
    {
        Task<TravelPurposeDto> CreateAsync(TravelPurposeDto travelPurpose, CancellationToken cancellationToken = default);
    }
}
