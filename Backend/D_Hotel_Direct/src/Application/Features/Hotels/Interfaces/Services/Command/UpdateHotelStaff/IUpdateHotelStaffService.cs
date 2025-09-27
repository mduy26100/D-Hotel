using Application.Features.Hotels.DTOs;

namespace Application.Features.Hotels.Interfaces.Services.Command.UpdateHotelStaff
{
    public interface IUpdateHotelStaffService
    {
        Task UpdateAsync(HotelStaffDto dto, CancellationToken cancellationToken);
    }
}
