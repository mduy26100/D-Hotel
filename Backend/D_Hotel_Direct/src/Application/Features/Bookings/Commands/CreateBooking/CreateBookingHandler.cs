using Application.Features.Bookings.DTOs;
using Application.Features.Bookings.Interfaces.Services.Command.CreateBooking;
using MediatR;

namespace Application.Features.Bookings.Commands.CreateBooking
{
    public class CreateBookingHandler : IRequestHandler<CreateBookingCommand, BookingDto>
    {
        private readonly ICreateBookingService _createBookingService;
        private readonly ICurrentUserContext _currentUserContext;

        public CreateBookingHandler(ICreateBookingService createBookingService, ICurrentUserContext currentUserContext)
        {
            _createBookingService = createBookingService;
            _currentUserContext = currentUserContext;
        }

        public async Task<BookingDto> Handle(CreateBookingCommand request, CancellationToken cancellationToken)
        {
            Guid? userId = (_currentUserContext.UserId != Guid.Empty)
               ? _currentUserContext.UserId
               : null;

            var createBooking = await _createBookingService.CreateAsync(request.bookingAggregateDto, userId, cancellationToken);
            return createBooking;
        }
    }
}
