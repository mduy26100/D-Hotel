using Application.Features.Hotels.DTOs;
using MediatR;

namespace Application.Features.Hotels.Commands.DeleteHotel
{
    public record DeleteHotelCommand(HotelDto Dto) : IRequest;
}
