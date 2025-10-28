using Application.Features.Bookings.DTOs;
using MediatR;

namespace Application.Features.Bookings.Queries.Rating.GetRatingsByUserId
{
    public record GetRatingsByUserIdQuery() : IRequest<IEnumerable<RatingDto>>
    {
    }
}
