using Application.Features.Places.DTOs;
using MediatR;

namespace Application.Features.Places.Queries.GetHotelLocationByLocationId
{
    public record GetHotelLocationByLocationIdQuery(int locationId) : IRequest<IEnumerable<HotelLocationsDto>>;
}
