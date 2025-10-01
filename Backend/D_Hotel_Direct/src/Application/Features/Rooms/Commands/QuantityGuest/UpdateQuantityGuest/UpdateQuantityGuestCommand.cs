using Application.Features.Rooms.DTOs;
using MediatR;

namespace Application.Features.Rooms.Commands.QuantityGuest.UpdateQuantityGuest
{
    public record UpdateQuantityGuestCommand(QuantityGuestDto dto) : IRequest
    {
    }
}
