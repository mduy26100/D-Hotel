using Application.Features.Utilities.DTOs;
using MediatR;

namespace Application.Features.Utilities.Queries.GetUtilityById
{
    public record GetUtilityByIdQuery(int Id) : IRequest<UtilityDto?>;
}
