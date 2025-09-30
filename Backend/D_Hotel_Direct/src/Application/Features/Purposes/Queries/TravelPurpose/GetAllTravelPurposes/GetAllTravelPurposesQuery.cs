using Application.Features.Purposes.DTOs;
using MediatR;

namespace Application.Features.Purposes.Queries.TravelPurpose.GetAllTravelPurposes
{
    public record GetAllTravelPurposesQuery : IRequest<IEnumerable<TravelPurposeDto>>
    {
    }
}
