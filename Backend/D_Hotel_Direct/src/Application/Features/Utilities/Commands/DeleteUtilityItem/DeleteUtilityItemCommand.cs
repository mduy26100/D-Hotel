using Application.Features.Utilities.DTOs;
using MediatR;

namespace Application.Features.Utilities.Commands.DeleteUtilityItem
{
    public record DeleteUtilityItemCommand(UtilityItemDto Dto) : IRequest;
}
