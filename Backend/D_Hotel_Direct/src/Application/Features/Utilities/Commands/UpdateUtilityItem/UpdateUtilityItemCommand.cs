using Application.Features.Utilities.DTOs;
using MediatR;

namespace Application.Features.Utilities.Commands.UpdateUtilityItem
{
    public record UpdateUtilityItemCommand(UtilityItemDto Dto) : IRequest;
}
