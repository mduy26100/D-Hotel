using Application.Features.Places.DTOs;

namespace Application.Features.Places.Interfaces.Services.Command.UpdateHotelLocation
{
    public interface IUpdateHotelLocationService
    {
        Task UpdateAsync(HotelLocationsDto hotelLocationsDto, CancellationToken cancellationToken = default);
    }
}
