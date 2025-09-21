using Application.Features.Hotels.DTOs;

namespace Application.Features.Hotels.Interfaces.Services.Query.GetHotelDetail
{
    public interface IGetHotelDetailService
    {
        Task<HotelDetailDto?> GetHotelDetailAsync(int hotelId, CancellationToken cancellationToken);
    }
}
