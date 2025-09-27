using Application.Features.Hotels.DTOs;

namespace Application.Features.Hotels.Interfaces.Services.Query.GetHotelStaffsByHotelId
{
    public interface IGetHotelStaffsByHotelIdService
    {
        Task<IEnumerable<HotelStaffDto>> GetByHotelIdAsync(int hotelId, CancellationToken cancellationToken);
    }
}
