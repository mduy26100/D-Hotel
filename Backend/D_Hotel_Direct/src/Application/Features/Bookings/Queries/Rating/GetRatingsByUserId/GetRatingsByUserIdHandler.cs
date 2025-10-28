using Application.Features.Bookings.DTOs;
using Application.Features.Bookings.Interfaces.Services.Query.Rating.GetRatingsByUserId;
using MediatR;

namespace Application.Features.Bookings.Queries.Rating.GetRatingsByUserId
{
    public class GetRatingsByUserIdHandler : IRequestHandler<GetRatingsByUserIdQuery, IEnumerable<RatingDto>>
    {
        private readonly ICurrentUserContext _currentUserContext;
        private readonly IGetRatingsByUserIdService _getRatingsByUserIdService;

        public GetRatingsByUserIdHandler(ICurrentUserContext currentUserContext,
            IGetRatingsByUserIdService getRatingsByUserIdService)
        {
            _currentUserContext = currentUserContext;
            _getRatingsByUserIdService = getRatingsByUserIdService;
        }

        public async Task<IEnumerable<RatingDto>> Handle(GetRatingsByUserIdQuery request, CancellationToken cancellationToken)
        {
            var userId = _currentUserContext.UserId;
            return await _getRatingsByUserIdService.GetRatingsByUserIdAsync(userId, cancellationToken);
        }
    }
}
