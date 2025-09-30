using Application.Features.Purposes.DTOs;
using MediatR;

namespace Application.Features.Purposes.Queries.HotelTravelPurpose.GetAllHotelTravelPurposes
{
    public record GetAllHotelTravelPurposesQuery : IRequest<IEnumerable<HotelTravelPurposeDto>>
    {
    }
}
