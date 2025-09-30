using Application.Features.Hotels.DTOs;
using MediatR;

namespace Application.Features.Purposes.Queries.HotelTravelPurpose.GetHotelsByTravelPurposeId
{
    public record GetHotelsByTravelPurposeIdQuery(int travelPurposeId) : IRequest<IEnumerable<HotelDto>>
    {
    }
}
