using Application.Features.Bookings.DTOs;
using MediatR;

namespace Application.Features.Bookings.Queries.Invoice.GetInvoiceByBookingId
{
    public record GetInvoiceByBookingIdQuery(int bookingId) : IRequest<InvoiceDto>
    {
    }
}
