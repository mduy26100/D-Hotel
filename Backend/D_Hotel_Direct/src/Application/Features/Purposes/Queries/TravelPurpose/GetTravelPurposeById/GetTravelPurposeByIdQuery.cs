using Application.Features.Purposes.DTOs;
using MediatR;

namespace Application.Features.Purposes.Queries.TravelPurpose.GetTravelPurposeById
{
    public record GetTravelPurposeByIdQuery(int id) : IRequest<TravelPurposeDto>
    {
    }
}
