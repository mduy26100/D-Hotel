using Application.Features.Hotels.DTOs;
using MediatR;

namespace Application.Features.Hotels.Queries.GetHotelsByCategoryId
{
    public record GetHotelsByCategoryIdQuery(int CategoryId) : IRequest<IEnumerable<HotelDto>>;
}
