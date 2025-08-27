using MediatR;

namespace Application.Features.Utilities.Commands.DeleteHotelUtility
{
    public record DeleteHotelUtilityCommand(int hotelId, string utilityIds) : IRequest;
}
