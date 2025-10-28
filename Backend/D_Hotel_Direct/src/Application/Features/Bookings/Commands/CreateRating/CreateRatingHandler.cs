using Application.Features.Bookings.DTOs;
using Application.Features.Bookings.Interfaces.Services.Command.CreateRating;
using MediatR;

namespace Application.Features.Bookings.Commands.CreateRating
{
    public class CreateRatingHandler : IRequestHandler<CreateRatingCommand, RatingDto>
    {
        private readonly ICreateRatingService _createRatingService;
        private readonly ICurrentUserContext _currentUserContext;

        public CreateRatingHandler(
            ICreateRatingService createRatingService,
            ICurrentUserContext currentUserContext)
        {
            _createRatingService = createRatingService;
            _currentUserContext = currentUserContext;
        }

        public async Task<RatingDto> Handle(CreateRatingCommand request, CancellationToken cancellationToken)
        {
            var userId = _currentUserContext.UserId;

            if (userId == Guid.Empty)
                throw new UnauthorizedAccessException("User is not authenticated");

            request.dto.UserId = userId;

            var result = await _createRatingService.CreateAsync(request.dto, cancellationToken);

            return result;
        }
    }
}
