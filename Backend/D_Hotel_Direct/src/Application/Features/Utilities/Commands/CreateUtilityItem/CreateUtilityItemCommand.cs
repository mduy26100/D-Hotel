using Application.Features.Utilities.DTOs;
using MediatR;

namespace Application.Features.Utilities.Commands.CreateUtilityItem
{
    public record CreateUtilityItemCommand(UtilityItemDto Dto) : IRequest<UtilityItemDto>;
}
