using Application.Features.Places.DTOs;
using MediatR;

namespace Application.Features.Places.Commands.UpdateHotelLocation
{
    public record UpdateHotelLocationCommand(HotelLocationsDto dto) : IRequest;
}
