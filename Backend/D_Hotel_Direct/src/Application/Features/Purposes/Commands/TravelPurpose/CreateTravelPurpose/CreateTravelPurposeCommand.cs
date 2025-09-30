using Application.Features.Purposes.DTOs;
using MediatR;

namespace Application.Features.Purposes.Commands.TravelPurpose.CreateTravelPurpose
{
    public record CreateTravelPurposeCommand(TravelPurposeDto travelPurpose) : IRequest<TravelPurposeDto>
    {
    }
}
