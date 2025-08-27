using Application.Features.Utilities.DTOs;

namespace Application.Features.Utilities.Interfaces.Services.Query.GetUtilityByHotelId
{
    public interface IGetUtilityByHotelIdService
    {
        Task<IEnumerable<HotelUtilityDto>> GetByIdAsync(int hotelId, CancellationToken cancellationToken = default);
    }
}
