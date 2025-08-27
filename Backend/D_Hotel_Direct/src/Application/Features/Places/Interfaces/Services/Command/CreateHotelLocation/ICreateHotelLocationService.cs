using Application.Features.Places.DTOs;

namespace Application.Features.Places.Interfaces.Services.Command.CreateHotelLocation
{
    public interface ICreateHotelLocationService
    {
        Task<HotelLocationsDto> CreateAsync(HotelLocationsDto hotelLocationsDto, CancellationToken cancellationToken = default);
    }
}
