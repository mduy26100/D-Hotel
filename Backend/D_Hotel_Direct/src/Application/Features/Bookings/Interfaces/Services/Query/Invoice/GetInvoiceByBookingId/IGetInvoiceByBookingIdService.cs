using Application.Features.Bookings.DTOs;

namespace Application.Features.Bookings.Interfaces.Services.Query.Invoice.GetInvoiceByBookingId
{
    public interface IGetInvoiceByBookingIdService
    {
        Task<InvoiceDto> GetByBookingId(int bookingId, CancellationToken cancellationToken = default);
    }
}
