using Application.Features.Bookings.DTOs;
using MediatR;

namespace Application.Features.Bookings.Queries.Booking.GetBookingsByUserId
{
    public record GetBookingsByUserIdQuery() : IRequest<IEnumerable<BookingDto>>
    {
    }
}
