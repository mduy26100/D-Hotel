using Application.Features.Bookings.Interfaces.Services.Command.DeleteBooking;
using MediatR;

namespace Application.Features.Bookings.Commands.DeleteBooking
{
    public class DeleteBookingHandler : IRequestHandler<DeleteBookingCommand, Unit>
    {
        private readonly IDeleteBookingService _deleteBookingService;

        public DeleteBookingHandler(IDeleteBookingService deleteBookingService)
        {
            _deleteBookingService = deleteBookingService;
        }

        public async Task<Unit> Handle(DeleteBookingCommand request, CancellationToken cancellationToken)
        {
            await _deleteBookingService.DeleteAsync(request.bookingId, cancellationToken);
            return Unit.Value;
        }
    }
}
