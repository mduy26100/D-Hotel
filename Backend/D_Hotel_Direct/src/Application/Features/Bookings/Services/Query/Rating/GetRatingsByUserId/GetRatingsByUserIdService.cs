using Application.Features.Bookings.DTOs;
using Application.Features.Bookings.Interfaces.Services.Query.Rating.GetRatingsByUserId;
using Application.Features.Bookings.Repositories;
using AutoMapper;

namespace Application.Features.Bookings.Services.Query.Rating.GetRatingsByUserId
{
    public class GetRatingsByUserIdService : IGetRatingsByUserIdService
    {
        private readonly IRatingRepository _ratingRepository;
        private readonly IMapper _mapper;

        public GetRatingsByUserIdService(IRatingRepository ratingRepository,
            IMapper mapper)
        {
            _ratingRepository = ratingRepository;
            _mapper = mapper;
        }

        public async Task<IEnumerable<RatingDto>> GetRatingsByUserIdAsync(Guid userId, CancellationToken cancellationToken = default)
        {
            var list = await _ratingRepository.FindAsync(h => h.UserId == userId, cancellationToken);
            return _mapper.Map<IEnumerable<RatingDto>>(list);
        }
    }
}
