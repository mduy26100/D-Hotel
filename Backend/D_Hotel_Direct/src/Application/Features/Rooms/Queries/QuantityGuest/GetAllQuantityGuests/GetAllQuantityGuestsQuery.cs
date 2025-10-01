using Application.Features.Rooms.DTOs;
using MediatR;

namespace Application.Features.Rooms.Queries.QuantityGuest.GetAllQuantityGuests
{
    public record GetAllQuantityGuestsQuery() : IRequest<IEnumerable<QuantityGuestDto>>
    {
    }
}
