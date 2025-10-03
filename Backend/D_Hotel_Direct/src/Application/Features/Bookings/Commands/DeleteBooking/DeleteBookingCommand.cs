using MediatR;

namespace Application.Features.Bookings.Commands.DeleteBooking
{
    public record DeleteBookingCommand(int bookingId) : IRequest
    {
    }
}
