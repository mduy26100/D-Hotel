using Application.Features.Hotels.DTOs;

namespace Application.Features.Hotels.Interfaces.Services.Query.GetAllHotels
{
    public interface IGetAllHotelsService
    {
        Task<IEnumerable<HotelDetailDto>> GetAllAsync(CancellationToken cancellationToken = default);
    }
}
