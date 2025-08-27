using Application.Features.Places.DTOs;
using MediatR;

namespace Application.Features.Places.Queries.GetAllHotelLocations
{
    public record GetAllHotelLocationsQuery() : IRequest<IEnumerable<HotelLocationsDto>>;
}
