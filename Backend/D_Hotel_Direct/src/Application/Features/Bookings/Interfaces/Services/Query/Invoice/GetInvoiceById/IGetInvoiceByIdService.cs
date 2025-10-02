using Application.Features.Bookings.DTOs;

namespace Application.Features.Bookings.Interfaces.Services.Query.Invoice.GetInvoiceById
{
    public interface IGetInvoiceByIdService
    {
        Task<InvoiceDto> GetByIdAsync(int id, CancellationToken cancellationToken = default);
    }
}
