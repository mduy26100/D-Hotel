using Application.Features.Auth.Services.Query.CurrentUser;
using Application.Features.Bookings.DTOs;
using Application.Features.Bookings.Interfaces.Services.Query.Rating.GetRatingsByHotelId;
using Application.Features.Bookings.Repositories;
using AutoMapper;

namespace Application.Features.Bookings.Services.Query.Rating.GetRatingsByHotelId
{
    public class GetRatingsByHotelIdService : IGetRatingsByHotelIdService
    {
        private readonly IRatingRepository _ratingRepository;
        private readonly ICurrentUserService _currentUserService;
        private readonly IMapper _mapper;

        public GetRatingsByHotelIdService(
            IRatingRepository ratingRepository,
            ICurrentUserService currentUserService,
            IMapper mapper)
        {
            _ratingRepository = ratingRepository;
            _currentUserService = currentUserService;
            _mapper = mapper;
        }

        public async Task<IEnumerable<RatingDto>> GetRatingsByHotelIdAsync(int hotelId, CancellationToken cancellationToken)
        {
            var entities = await _ratingRepository.FindAsync(h => h.HotelId == hotelId, cancellationToken);

            var ratingDtos = new List<RatingDto>();

            foreach (var rating in entities)
            {
                var dto = _mapper.Map<RatingDto>(rating);

                // Gọi service lấy thông tin user theo UserId trong rating
                var user = await _currentUserService.GetCurrentUserAsync(rating.UserId, cancellationToken);
                dto.NameUser = user != null
                    ? $"{user.LastName} {user.FirstName}"
                    : "Unknown";

                ratingDtos.Add(dto);
            }

            return ratingDtos;
        }
    }
}