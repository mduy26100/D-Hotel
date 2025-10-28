using Application.Features.Bookings.DTOs;

namespace Application.Features.Bookings.Interfaces.Services.Command.CreateRating
{
    public interface ICreateRatingService
    {
        Task<RatingDto> CreateAsync(RatingDto rating, CancellationToken cancellationToken  = default);
    }
}
