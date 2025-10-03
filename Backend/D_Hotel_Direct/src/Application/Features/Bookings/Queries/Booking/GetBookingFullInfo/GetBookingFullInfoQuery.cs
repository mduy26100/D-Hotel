using Application.Features.Bookings.DTOs;
using MediatR;

namespace Application.Features.Bookings.Queries.Booking.GetBookingFullInfo
{
    public record GetBookingFullInfoQuery(int bookingId) : IRequest<BookingAggregateDto>
    {
    }
}
