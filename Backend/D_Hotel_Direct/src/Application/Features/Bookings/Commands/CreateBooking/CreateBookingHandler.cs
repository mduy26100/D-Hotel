using Application.Features.Bookings.Interfaces.Services.Command.CreateBooking;
using MediatR;

namespace Application.Features.Bookings.Commands.CreateBooking
{
    public class CreateBookingHandler : IRequestHandler<CreateBookingCommand, int>
    {
        private readonly ICreateBookingService _createBookingService;

        public CreateBookingHandler(ICreateBookingService createBookingService)
        {
            _createBookingService = createBookingService;
        }

        public async Task<int> Handle(CreateBookingCommand request, CancellationToken cancellationToken)
        {
            var createBooking = await _createBookingService.CreateAsync(request.bookingAggregateDto, cancellationToken);
            return createBooking;
        }
    }
}
