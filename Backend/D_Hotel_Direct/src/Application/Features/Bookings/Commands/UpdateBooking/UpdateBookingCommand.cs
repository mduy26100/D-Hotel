using Application.Features.Bookings.DTOs;
using MediatR;

namespace Application.Features.Bookings.Commands.UpdateBooking
{
    public record UpdateBookingCommand(int bookingId, BookingAggregateDto bookingAggregateDto) : IRequest
    {
    }
}
