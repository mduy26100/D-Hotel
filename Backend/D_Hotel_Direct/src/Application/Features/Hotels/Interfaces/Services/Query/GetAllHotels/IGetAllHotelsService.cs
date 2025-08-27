using Application.Features.Hotels.DTOs;

namespace Application.Features.Hotels.Interfaces.Services.Query.GetAllHotels
{
    public interface IGetAllHotelsService
    {
        Task<IEnumerable<HotelDto>> GetAllAsync(CancellationToken cancellationToken = default);
    }
}
