using Application.Features.Bookings.DTOs;
using MediatR;

namespace Application.Features.Bookings.Queries.BookingDetail.GetBookingDetailsById
{
    public record GetBookingDetailsByIdQuery(int id) : IRequest<BookingDetailDto>
    {
    }
}
