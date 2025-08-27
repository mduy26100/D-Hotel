using Application.Features.Places.DTOs;
using MediatR;

namespace Application.Features.Places.Queries.GetAllLocations
{
    public record GetAllLocationsQuery() : IRequest<IEnumerable<LocationsDto>>;
}
