using Application.Features.Purposes.DTOs;

namespace Application.Features.Purposes.Interfaces.Services.Command.HotelTravelPurpose.UpdateHotelTravelPurpose
{
    public interface IUpdateHotelTravelPurposeService
    {
        Task UpdateAsync(HotelTravelPurposeDto hotelTravelPurposeDto, CancellationToken cancellationToken = default);
    }
}
