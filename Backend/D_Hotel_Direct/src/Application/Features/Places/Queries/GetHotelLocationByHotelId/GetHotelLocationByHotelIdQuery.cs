using Application.Features.Places.DTOs;
using MediatR;

namespace Application.Features.Places.Queries.GetHotelLocationByHotelId
{
    public record GetHotelLocationByHotelIdQuery(int hotelId) : IRequest<HotelLocationsDto>;
}
