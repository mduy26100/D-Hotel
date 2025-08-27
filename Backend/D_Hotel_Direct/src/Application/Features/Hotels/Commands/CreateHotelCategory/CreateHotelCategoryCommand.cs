using Application.Features.Hotels.DTOs;
using MediatR;

namespace Application.Features.Hotels.Commands.CreateHotelCategory
{
    public record CreateHotelCategoryCommand(HotelCategoryDto Dto) : IRequest<HotelCategoryDto>;
}
