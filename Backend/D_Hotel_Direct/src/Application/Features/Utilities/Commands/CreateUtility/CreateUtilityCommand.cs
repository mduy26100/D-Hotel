using Application.Features.Utilities.DTOs;
using MediatR;

namespace Application.Features.Utilities.Commands.CreateUtility
{
    public record CreateUtilityCommand(string Name, Stream? ImageContent, string? ImageFileName, string? ImageContentType) : IRequest<UtilityDto>;
}