using Application.Features.Hotels.DTOs;
using MediatR;

namespace Application.Features.Hotels.Commands.DeleteHotelCategory
{
    public record DeleteHotelCategoryCommand(HotelCategoryDto Dto) : IRequest;
}
