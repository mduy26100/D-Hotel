using Application.Features.Hotels.DTOs;
using MediatR;

namespace Application.Features.Hotels.Queries.GetAllHotelCategories
{
    public record GetAllHotelCategoriesQuery() : IRequest<IEnumerable<HotelCategoryDto>>;
}
