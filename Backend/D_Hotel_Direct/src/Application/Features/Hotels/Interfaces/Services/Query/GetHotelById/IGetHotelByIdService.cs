using Application.Features.Hotels.DTOs;

namespace Application.Features.Hotels.Interfaces.Services.Query.GetHotelById
{
    public interface IGetHotelByIdService
    {
        Task<HotelDto> GetByIdAsync(int id, CancellationToken cancellationToken = default);
    }
}
