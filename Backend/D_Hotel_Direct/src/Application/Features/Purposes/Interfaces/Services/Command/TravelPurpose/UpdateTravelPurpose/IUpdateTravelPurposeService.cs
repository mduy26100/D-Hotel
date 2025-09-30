using Application.Features.Purposes.DTOs;

namespace Application.Features.Purposes.Interfaces.Services.Command.TravelPurpose.UpdateTravelPurpose
{
    public interface IUpdateTravelPurposeService
    {
        Task UpdateAsync(TravelPurposeDto travelPurposeDto, CancellationToken cancellationToken = default);
    }
}
