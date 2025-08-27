using Application.Features.Hotels.DTOs;

namespace Application.Features.Hotels.Interfaces.Services.Command.DeleteHotelCategory
{
    public interface IDeleteHotelCategoryService
    {
        Task DeleteAsync(HotelCategoryDto hotelCategoryDto, CancellationToken cancellationToken = default);
    }
}
