using Application.Features.Bookings.DTOs;
using MediatR;

namespace Application.Features.Bookings.Queries.Booking.GetAllBookings
{
    public record GetAllBookingsQuery() : IRequest<IEnumerable<BookingDto>>
    {
    }
}
