using Application.Features.Bookings.DTOs;
using MediatR;

namespace Application.Features.Bookings.Queries.Rating.GetRatingsByHotelId
{
    public record GetRatingsByHotelIdQuery(int hotelId) : IRequest<IEnumerable<RatingDto>>
    {
    }
}
