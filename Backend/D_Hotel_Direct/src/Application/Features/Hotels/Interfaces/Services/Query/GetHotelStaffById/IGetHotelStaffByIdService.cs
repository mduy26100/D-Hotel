using Application.Features.Hotels.DTOs;

namespace Application.Features.Hotels.Interfaces.Services.Query.GetHotelStaffById
{
    public interface IGetHotelStaffByIdService
    {
        Task<HotelStaffDto> GetByIdAsync(int id, CancellationToken cancellationToken);
    }
}
