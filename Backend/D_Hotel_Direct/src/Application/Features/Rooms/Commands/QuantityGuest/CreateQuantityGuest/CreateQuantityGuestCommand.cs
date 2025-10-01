using Application.Features.Rooms.DTOs;
using MediatR;

namespace Application.Features.Rooms.Commands.QuantityGuest.CreateQuantityGuest
{
    public record CreateQuantityGuestCommand(QuantityGuestDto dto) : IRequest<QuantityGuestDto>
    {
    }
}
