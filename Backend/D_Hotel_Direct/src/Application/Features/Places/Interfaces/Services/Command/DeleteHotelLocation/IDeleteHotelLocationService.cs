using Application.Features.Places.DTOs;

namespace Application.Features.Places.Interfaces.Services.Command.DeleteHotelLocation
{
    public interface IDeleteHotelLocationService
    {
        Task DeleteAsync(HotelLocationsDto hotelLocationsDto, CancellationToken cancellationToken = default);
    }
}
