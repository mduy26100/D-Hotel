using Application.Features.Hotels.DTOs;

namespace Application.Features.Hotels.Interfaces.Services.Query.GetAllHotelStaffs
{
    public interface IGetAllHotelStaffsService
    {
        Task<IEnumerable<HotelStaffDto>> GetAllAsync(CancellationToken cancellationToken);
    }
}
