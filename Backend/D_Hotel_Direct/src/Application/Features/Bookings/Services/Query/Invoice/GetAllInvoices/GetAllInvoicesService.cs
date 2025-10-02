using Application.Features.Bookings.DTOs;
using Application.Features.Bookings.Interfaces.Services.Query.Invoice.GetAllInvoices;

namespace Application.Features.Bookings.Services.Query.Invoice.GetAllInvoices
{
    public class GetAllInvoicesService : IGetAllInvoicesService
    {
        public Task<IEnumerable<InvoiceDto>> GetAllAsync(CancellationToken cancellationToken = default)
        {
            throw new NotImplementedException();
        }
    }
}
