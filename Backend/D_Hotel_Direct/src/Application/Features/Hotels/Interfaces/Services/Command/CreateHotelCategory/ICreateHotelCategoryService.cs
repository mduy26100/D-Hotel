using Application.Features.Hotels.DTOs;

namespace Application.Features.Hotels.Interfaces.Services.Command.CreateHotelCategory
{
    public interface ICreateHotelCategoryService
    {
        Task<HotelCategoryDto> CreateAsync(HotelCategoryDto hotelCategoryDto, CancellationToken cancellationToken = default);
    }
}
