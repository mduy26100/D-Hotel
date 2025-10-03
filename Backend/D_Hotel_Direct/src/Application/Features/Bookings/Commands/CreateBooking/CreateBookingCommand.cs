using Application.Features.Bookings.DTOs;
using MediatR;

namespace Application.Features.Bookings.Commands.CreateBooking
{
    public record CreateBookingCommand(BookingAggregateDto bookingAggregateDto) : IRequest<int>
    {
    }
}
