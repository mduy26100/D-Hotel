using Application.Features.Hotels.DTOs;

namespace Application.Features.Hotels.Interfaces.Services.Command.DeleteHotelStaff
{
    public interface IDeleteHotelStaffService
    {
        Task DeleteAsync(HotelStaffDto dto, CancellationToken cancellationToken);
    }
}
