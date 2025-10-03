using Application.Features.Bookings.DTOs;
using MediatR;

namespace Application.Features.Bookings.Queries.Invoice.GetAllInvoices
{
    public class GetAllInvoicesQuery() : IRequest<IEnumerable<InvoiceDto>>
    {
    }
}
