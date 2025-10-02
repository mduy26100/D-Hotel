using Application.Features.Bookings.DTOs;
using Application.Features.Bookings.Interfaces.Services.Query.Invoice.GetInvoiceById;

namespace Application.Features.Bookings.Services.Query.Invoice.GetInvoiceById
{
    public class GetInvoiceByIdService : IGetInvoiceByIdService
    {
        public Task<InvoiceDto> GetByIdAsync(int id, CancellationToken cancellationToken = default)
        {
            throw new NotImplementedException();
        }
    }
}
