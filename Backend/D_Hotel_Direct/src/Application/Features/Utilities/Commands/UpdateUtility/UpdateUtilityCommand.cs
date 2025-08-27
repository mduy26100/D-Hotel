using Application.Features.Utilities.DTOs;
using MediatR;

namespace Application.Features.Utilities.Commands.UpdateUtility
{
    public record UpdateUtilityCommand(
    UtilityDto Dto,
    Stream? ImageContent,
    string? ImageFileName,
    string? ImageContentType
) : IRequest;
}
