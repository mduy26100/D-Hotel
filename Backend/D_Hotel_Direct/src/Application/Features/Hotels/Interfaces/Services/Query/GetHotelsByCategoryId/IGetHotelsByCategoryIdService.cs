using Application.Features.Hotels.DTOs;

namespace Application.Features.Hotels.Interfaces.Services.Query.GetHotelCategoryById
{
    public interface IGetHotelsByCategoryIdService
    {
        Task<IEnumerable<HotelDto>> GetHotelsByCategoryIdAsync(int categoryId, CancellationToken cancellationToken = default);
    }
}
