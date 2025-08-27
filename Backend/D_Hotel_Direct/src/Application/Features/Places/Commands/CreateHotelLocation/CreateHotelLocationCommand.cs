using Application.Features.Places.DTOs;
using MediatR;

namespace Application.Features.Places.Commands.CreateHotelLocation
{
    public record CreateHotelLocationCommand(HotelLocationsDto dto) : IRequest<HotelLocationsDto>;
}
