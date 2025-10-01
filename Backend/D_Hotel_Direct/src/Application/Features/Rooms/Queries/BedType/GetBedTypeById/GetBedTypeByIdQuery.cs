using Application.Features.Rooms.DTOs;
using MediatR;

namespace Application.Features.Rooms.Queries.BedType.GetBedTypeById
{
    public record GetBedTypeByIdQuery(int id) : IRequest<BedTypeDto>
    {
    }
}
