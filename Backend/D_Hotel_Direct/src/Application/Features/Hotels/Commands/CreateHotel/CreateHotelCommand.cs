using Application.Features.Hotels.DTOs;
using MediatR;

namespace Application.Features.Hotels.Commands.CreateHotel
{
    public record CreateHotelCommand(HotelDto dto, Stream? ImageContent,string? ImageFileName, string? ImageContentType) : IRequest<HotelDto>;
}
