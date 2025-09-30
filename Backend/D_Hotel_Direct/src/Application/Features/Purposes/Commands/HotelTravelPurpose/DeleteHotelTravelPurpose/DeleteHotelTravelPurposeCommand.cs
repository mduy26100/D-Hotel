using Application.Features.Purposes.DTOs;
using MediatR;

namespace Application.Features.Purposes.Commands.HotelTravelPurpose.DeleteHotelTravelPurpose
{
    public record DeleteHotelTravelPurposeCommand(HotelTravelPurposeDto hotelTravelPurposeDto) : IRequest
    {
    }
}
