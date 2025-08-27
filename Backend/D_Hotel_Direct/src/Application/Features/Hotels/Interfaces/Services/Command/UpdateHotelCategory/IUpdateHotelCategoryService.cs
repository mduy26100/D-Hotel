using Application.Features.Hotels.DTOs;

namespace Application.Features.Hotels.Interfaces.Services.Command.UpdateHotelCategory
{
    public interface IUpdateHotelCategoryService
    {
        Task UpdateAsync(HotelCategoryDto hotelCategoryDto, CancellationToken cancellationToken = default);
    }
}
