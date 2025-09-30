using Application.Features.Purposes.DTOs;
using MediatR;

namespace Application.Features.Purposes.Commands.HotelTravelPurpose.CreateHotelTravelPurpose
{
    public record CreateHotelTravelPurposeCommand(HotelTravelPurposeDto hotelTravelPurposeDto) : IRequest<HotelTravelPurposeDto>
    {
    }
}
