using Application.Features.Purposes.DTOs;

namespace Application.Features.Purposes.Interfaces.Services.Query.TravelPurpose.GetTravelPurposeById
{
    public interface IGetTravelPurposeByIdService
    {
        Task<TravelPurposeDto> GetByIdAsync(int id, CancellationToken cancellationToken = default);
    }
}
