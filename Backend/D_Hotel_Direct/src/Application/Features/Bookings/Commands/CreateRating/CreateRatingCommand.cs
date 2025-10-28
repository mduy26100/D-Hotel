using Application.Features.Bookings.DTOs;
using MediatR;

namespace Application.Features.Bookings.Commands.CreateRating
{
    public record CreateRatingCommand(RatingDto dto) : IRequest<RatingDto>
    {
    }
}
