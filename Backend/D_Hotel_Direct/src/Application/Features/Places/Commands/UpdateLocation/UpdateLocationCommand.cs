using Application.Features.Places.DTOs;
using MediatR;

namespace Application.Features.Places.Commands.UpdateLocation
{
    public record UpdateLocationCommand(LocationsDto dto, Stream? ImageContent, string? ImageFileName, string? ImageContentType) : IRequest;
}
