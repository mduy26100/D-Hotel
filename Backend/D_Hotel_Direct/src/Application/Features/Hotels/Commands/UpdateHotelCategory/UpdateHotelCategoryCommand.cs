using Application.Features.Hotels.DTOs;
using MediatR;

namespace Application.Features.Hotels.Commands.UpdateHotelCategory
{
    public record UpdateHotelCategoryCommand(HotelCategoryDto Dto) : IRequest;
}
