using Application.Features.Hotels.DTOs;

namespace Application.Features.Hotels.Interfaces.Services.Query.GetHotelCategoryById
{
    public interface IGetHotelCategoryByIdService
    {
        Task<HotelCategoryDto> GetByIdAsync(int id, CancellationToken cancellationToken = default);
    }
}
