using Application.Features.Purposes.DTOs;

namespace Application.Features.Purposes.Interfaces.Services.Command.HotelTravelPurpose.CreateHotelTravelPurpose
{
    public interface ICreateHotelTravelPurposeService
    {
        Task<HotelTravelPurposeDto> CreateAsync(HotelTravelPurposeDto hotelTravelPurpose, CancellationToken cancellationToken = default);
    }
}
