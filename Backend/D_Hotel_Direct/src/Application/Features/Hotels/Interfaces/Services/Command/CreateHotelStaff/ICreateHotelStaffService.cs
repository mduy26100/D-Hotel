using Application.Features.Hotels.DTOs;

namespace Application.Features.Hotels.Interfaces.Services.Command.CreateHotelStaff
{
    public interface ICreateHotelStaffService
    {
        Task<HotelStaffDto> CreateAsync(HotelStaffDto hotelStaffDto, CancellationToken cancellationToken);
    }
}
