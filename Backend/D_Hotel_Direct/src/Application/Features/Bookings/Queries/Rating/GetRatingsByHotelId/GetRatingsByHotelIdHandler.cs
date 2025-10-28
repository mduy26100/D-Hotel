using Application.Features.Bookings.DTOs;
using Application.Features.Bookings.Interfaces.Services.Query.Rating.GetRatingsByHotelId;
using MediatR;

namespace Application.Features.Bookings.Queries.Rating.GetRatingsByHotelId
{
    public class GetRatingsByHotelIdHandler : IRequestHandler<GetRatingsByHotelIdQuery, IEnumerable<RatingDto>>
    {
        private readonly IGetRatingsByHotelIdService _getRatingsByHotelId;

        public GetRatingsByHotelIdHandler(IGetRatingsByHotelIdService getRatingsByHotelId)
        {
            _getRatingsByHotelId = getRatingsByHotelId;
        }

        public async Task<IEnumerable<RatingDto>> Handle(GetRatingsByHotelIdQuery request, CancellationToken cancellationToken)
        {
            return await _getRatingsByHotelId.GetRatingsByHotelIdAsync(request.hotelId, cancellationToken);
        }
    }
}
