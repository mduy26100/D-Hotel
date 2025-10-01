using Application.Features.Rooms.DTOs;
using MediatR;

namespace Application.Features.Rooms.Queries.BedType.GetAllBedTypes
{
    public record GetAllBedTypesQuery() : IRequest<IEnumerable<BedTypeDto>>
    {
    }
}
