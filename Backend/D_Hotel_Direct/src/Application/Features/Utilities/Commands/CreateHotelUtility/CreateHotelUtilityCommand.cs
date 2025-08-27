using Application.Features.Utilities.DTOs;
using MediatR;

namespace Application.Features.Utilities.Commands.CreateHotelUtility
{
    public record CreateHotelUtilityCommand(int hotelId, string utilityId) : IRequest<HotelUtilityDto>;
}
