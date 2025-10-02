using Application.Features.Bookings.DTOs;
using Application.Features.Bookings.Interfaces.Services.Query.Invoice.GetInvoiceByBookingId;

namespace Application.Features.Bookings.Services.Query.Invoice.GetInvoiceByBookingId
{
    public class GetInvoiceByBookingIdService : IGetInvoiceByBookingIdService
    {
        public Task<InvoiceDto> GeByBookingId(int bookingId, CancellationToken cancellationToken = default)
        {
            throw new NotImplementedException();
        }
    }
}
