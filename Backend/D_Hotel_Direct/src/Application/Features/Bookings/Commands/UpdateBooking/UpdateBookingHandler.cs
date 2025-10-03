using Application.Features.Bookings.Interfaces.Services.Command.UpdateBooking;
using MediatR;

namespace Application.Features.Bookings.Commands.UpdateBooking
{
    public class UpdateBookingHandler : IRequestHandler<UpdateBookingCommand, Unit>
    {
        private readonly IUpdateBookingService _updateBookingService;

        public UpdateBookingHandler(IUpdateBookingService updateBookingService)
        {
            _updateBookingService = updateBookingService;
        }

        public async Task<Unit> Handle(UpdateBookingCommand request, CancellationToken cancellationToken)
        {
            await _updateBookingService.UpdateAsync(request.bookingId, request.bookingAggregateDto, cancellationToken);
            return Unit.Value;
        }
    }
}
