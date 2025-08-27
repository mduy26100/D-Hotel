using Application.Features.Places.DTOs;
using MediatR;

namespace Application.Features.Places.Queries.GetLocationById
{
    public record GetLocationByIdQuery(int id) : IRequest<LocationsDto>;
}
