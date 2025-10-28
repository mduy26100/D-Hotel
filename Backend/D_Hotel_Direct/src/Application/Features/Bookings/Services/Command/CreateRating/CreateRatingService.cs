using Application.Features.Bookings.DTOs;
using Application.Features.Bookings.Interfaces.Services.Command.CreateRating;
using Application.Features.Bookings.Repositories;
using AutoMapper;
using Domain.Models.Bookings;

namespace Application.Features.Bookings.Services.Command.CreateRating
{
    public class CreateRatingService : ICreateRatingService
    {
        private readonly IRatingRepository _ratingRepository;
        private readonly IBookingRepository _bookingRepository;
        private readonly IMapper _mapper;
        private readonly IApplicationDbContext _context;

        public CreateRatingService(
            IRatingRepository ratingRepository,
            IBookingRepository bookingRepository,
            IMapper mapper,
            IApplicationDbContext context)
        {
            _ratingRepository = ratingRepository;
            _bookingRepository = bookingRepository;
            _mapper = mapper;
            _context = context;
        }

        public async Task<RatingDto> CreateAsync(RatingDto ratingDto, CancellationToken cancellationToken = default)
        {
            bool hasRated = await _ratingRepository
                .HasUserRatedBookingAsync(ratingDto.BookingId);

            if (hasRated)
                throw new InvalidOperationException("This booking has already been rated.");

            var booking = await _bookingRepository.FindOneAsync(b => b.Id == ratingDto.BookingId, cancellationToken);

            if (booking == null)
                throw new KeyNotFoundException("Booking not found.");

            var entity = _mapper.Map<Rating>(ratingDto);

            await _ratingRepository.AddAsync(entity);
            await _context.SaveChangesAsync();

            return _mapper.Map<RatingDto>(entity);
        }
    }
}
