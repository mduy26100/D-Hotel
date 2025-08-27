using Application.Features.Utilities.DTOs;
using MediatR;

namespace Application.Features.Utilities.Queries.GetUtilityItemsByUtilityId
{
    public record GetUtilityItemsByUtilityIdQuery(int utilityId) : IRequest<IEnumerable<UtilityItemDto>>;
}
