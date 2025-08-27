using Application.Features.Hotels.DTOs;

namespace Application.Features.Hotels.Interfaces.Services.Query.GetAllHotelCategories
{
    public interface IGetAllHotelCategoriesService
    {
        Task<IEnumerable<HotelCategoryDto>> GetAllAsync(CancellationToken cancellationToken = default);
    }
}
