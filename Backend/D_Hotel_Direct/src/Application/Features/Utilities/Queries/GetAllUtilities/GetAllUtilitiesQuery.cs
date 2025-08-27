using Application.Features.Utilities.DTOs;
using MediatR;

namespace Application.Features.Utilities.Queries.GetAllUtilities
{
    public record GetAllUtilitiesQuery() : IRequest<IEnumerable<UtilityDto>>;
}
