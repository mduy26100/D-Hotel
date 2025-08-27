using MediatR;

namespace Application.Features.Utilities.Commands.UpdateHotelUtility
{
    public record UpdateHotelUtilityCommand(int hotelId, string utilityIds) : IRequest;
}
