using Application.Features.Hotels.DTOs;
using MediatR;

namespace Application.Features.Hotels.Commands.UpdateHotel
{
    public record UpdateHotelCommand(HotelDto dto, Stream? ImageContent, string? ImageFileName, string? ImageContentType) : IRequest;
}
