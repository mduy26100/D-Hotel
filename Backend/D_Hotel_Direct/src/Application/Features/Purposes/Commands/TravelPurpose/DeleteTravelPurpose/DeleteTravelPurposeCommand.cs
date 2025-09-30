using Application.Features.Purposes.DTOs;
using MediatR;

namespace Application.Features.Purposes.Commands.TravelPurpose.DeleteTravelPurpose
{
    public record DeleteTravelPurposeCommand(TravelPurposeDto travelPurpose) : IRequest
    {

    }
}
