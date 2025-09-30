using Application.Features.Purposes.DTOs;

namespace Application.Features.Purposes.Interfaces.Services.Command.HotelTravelPurpose.DeleteHotelTravelPurpose
{
    public interface IDeleteHotelTravelPurposeService
    {
        Task DeleteAsync(HotelTravelPurposeDto hotelTravelPurposeDto, CancellationToken cancellationToken = default);
    }
}
