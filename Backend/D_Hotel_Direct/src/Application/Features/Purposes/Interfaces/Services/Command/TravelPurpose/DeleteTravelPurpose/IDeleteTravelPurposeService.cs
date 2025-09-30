using Application.Features.Purposes.DTOs;

namespace Application.Features.Purposes.Interfaces.Services.Command.TravelPurpose.DeleteTravelPurpose
{
    internal interface IDeleteTravelPurposeService
    {
        Task DeleteAsync(TravelPurposeDto travelPurposeDto, CancellationToken cancellationToken = default);
    }
}
