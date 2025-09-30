using Application.Features.Purposes.DTOs;
using MediatR;

namespace Application.Features.Purposes.Commands.HotelTravelPurpose.UpdateHotelTravelPurpose
{
    public record UpdateHotelTravelPurposeCommand(HotelTravelPurposeDto hotelTravelPurposeDto) : IRequest
    {
    }
}
