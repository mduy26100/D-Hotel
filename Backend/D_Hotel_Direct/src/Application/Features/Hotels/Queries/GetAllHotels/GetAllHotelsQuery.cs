using Application.Features.Hotels.DTOs;
using MediatR;

namespace Application.Features.Hotels.Queries.GetAllHotels
{
    public record GetAllHotelsQuery() : IRequest<IEnumerable<HotelDto>>;
}
