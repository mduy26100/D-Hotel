using Application.Features.Places.DTOs;
using MediatR;

namespace Application.Features.Places.Commands.DeleteHotelLocation
{
    public record DeleteHotelLocationCommand(HotelLocationsDto dto) : IRequest;
}
