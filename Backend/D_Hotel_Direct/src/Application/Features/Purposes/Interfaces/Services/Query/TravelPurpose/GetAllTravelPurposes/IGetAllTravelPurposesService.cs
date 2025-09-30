using Application.Features.Purposes.DTOs;

namespace Application.Features.Purposes.Interfaces.Services.Query.TravelPurpose.GetAllTravelPurposes
{
    public interface IGetAllTravelPurposesService
    {
        Task<IEnumerable<TravelPurposeDto>> GetAllAsync(CancellationToken cancellationToken = default);
    }
}
