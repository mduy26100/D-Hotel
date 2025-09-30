using Application.Features.Purposes.DTOs;
using MediatR;

namespace Application.Features.Purposes.Commands.TravelPurpose.UpdateTravelPurpose
{
    public record UpdateTravelPurposeCommand(TravelPurposeDto travelPurpose) : IRequest
    {
    }
}
