using Application.Features.Bookings.DTOs;
using MediatR;

namespace Application.Features.Bookings.Queries.Booking.GetBookingsByDateRange
{
    public record GetBookingsByDateRangeQuery(DateTime startDate, DateTime endDate) : IRequest<IEnumerable<BookingDto>>
    {
    }
}
