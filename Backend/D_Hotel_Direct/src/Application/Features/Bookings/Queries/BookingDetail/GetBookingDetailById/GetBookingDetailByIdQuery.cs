using Application.Features.Bookings.DTOs;
using MediatR;

namespace Application.Features.Bookings.Queries.BookingDetail.GetBookingDetailById
{
    public record GetBookingDetailByIdQuery(int id) : IRequest<BookingDetailDto>
    {
    }
}
