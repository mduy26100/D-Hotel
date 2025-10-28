using Application.Features.Bookings.DTOs;

namespace Application.Features.Bookings.Interfaces.Services.Query.Rating.GetRatingsByHotelId
{
    public interface IGetRatingsByHotelIdService
    {
        Task<IEnumerable<RatingDto>> GetRatingsByHotelIdAsync(int hotelId, CancellationToken cancellationToken);
    }
}
