using Application.Features.Bookings.DTOs;

namespace Application.Features.Bookings.Interfaces.Services.Query.Invoice.GetAllInvoices
{
    public interface IGetAllInvoicesService
    {
        Task<IEnumerable<InvoiceDto>> GetAllAsync(CancellationToken cancellationToken = default);
    }
}
