using Application.Features.Utilities.DTOs;
using MediatR;

namespace Application.Features.Utilities.Commands.DeleteUtility
{
    public record DeleteUtilityCommand(UtilityDto Dto) : IRequest;
}
