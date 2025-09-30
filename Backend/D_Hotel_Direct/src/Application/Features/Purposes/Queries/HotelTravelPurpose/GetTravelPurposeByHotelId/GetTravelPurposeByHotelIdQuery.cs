using Application.Features.Purposes.DTOs;
using MediatR;

namespace Application.Features.Purposes.Queries.HotelTravelPurpose.GetTravelPurposeByHotelId
{
    public record GetTravelPurposeByHotelIdQuery(int hotelId) : IRequest<HotelTravelPurposeDto>
    {
    }
}
