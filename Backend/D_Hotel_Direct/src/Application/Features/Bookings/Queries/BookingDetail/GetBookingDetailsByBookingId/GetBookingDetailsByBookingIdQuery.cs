using Application.Features.Bookings.DTOs;
using MediatR;

namespace Application.Features.Bookings.Queries.BookingDetail.GetBookingDetailsByBookingId
{
    public record GetBookingDetailsByBookingIdQuery(int bookingId) : IRequest<IEnumerable<BookingDetailDto>>
    {
    }
}
