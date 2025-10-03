using Application.Features.Bookings.DTOs;
using MediatR;

namespace Application.Features.Bookings.Queries.Invoice.GetInvoiceById
{
    public record GetInvoiceByIdQuery(int id) : IRequest<InvoiceDto>
    {
    }
}
