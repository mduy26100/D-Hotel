using Application.Features.Rooms.DTOs;
using MediatR;

namespace Application.Features.Rooms.Commands.QuantityGuest.DeleteQuantityGuest
{
    public record DeleteQuantityGuestCommand(QuantityGuestDto dto) : IRequest
    {
    }
}
