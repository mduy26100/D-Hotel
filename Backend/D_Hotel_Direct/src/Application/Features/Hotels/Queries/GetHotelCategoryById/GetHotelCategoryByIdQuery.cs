using Application.Features.Hotels.DTOs;
using MediatR;

namespace Application.Features.Hotels.Queries.GetHotelCategoryById
{
    public record GetHotelCategoryByIdQuery(int Id) : IRequest<HotelCategoryDto>;
}
