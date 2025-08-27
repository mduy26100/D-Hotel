using Application.Features.Utilities.DTOs;
using MediatR;

namespace Application.Features.Utilities.Queries.GetUtilityByHotelId
{
    public record GetUtilityByHotelIdQuery(int hotelId) : IRequest<IEnumerable<HotelUtilityDto>>;
}
