using Application.Features.Bookings.DTOs;

namespace Application.Features.Bookings.Interfaces.Services.Query.Rating.GetRatingsByUserId
{
    public interface IGetRatingsByUserIdService
    {
        Task<IEnumerable<RatingDto>> GetRatingsByUserIdAsync(Guid userId, CancellationToken cancellationToken = default);
    }
}
