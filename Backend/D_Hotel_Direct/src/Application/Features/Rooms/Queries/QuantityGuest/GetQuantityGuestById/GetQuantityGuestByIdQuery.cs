using Application.Features.Rooms.DTOs;
using MediatR;

namespace Application.Features.Rooms.Queries.QuantityGuest.GetQuantityGuestById
{
    public record GetQuantityGuestByIdQuery(int id) : IRequest<QuantityGuestDto>
    {
    }
}
