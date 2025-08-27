using Application.Features.Places.DTOs;
using MediatR;

namespace Application.Features.Places.Commands.CreateLocation
{
    public record CreateLocationCommand(string name, Stream? ImageContent, string? ImageFileName, string? ImageContentType) : IRequest<LocationsDto>;
}
