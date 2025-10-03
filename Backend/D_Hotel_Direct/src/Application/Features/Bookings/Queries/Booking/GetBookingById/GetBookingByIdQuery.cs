using Application.Features.Bookings.DTOs;
using MediatR;

namespace Application.Features.Bookings.Queries.Booking.GetBookingById
{
    public record GetBookingByIdQuery(int id) : IRequest<BookingDto>
    {
    }
}
