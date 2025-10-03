using Application.Features.Bookings.DTOs;
using Application.Features.Bookings.Interfaces.Services.Query.Invoice.GetInvoiceByBookingId;
using MediatR;

namespace Application.Features.Bookings.Queries.Invoice.GetInvoiceByBookingId
{
    public class GetInvoiceByBookingIdHandler : IRequestHandler<GetInvoiceByBookingIdQuery, InvoiceDto>
    {
        private readonly IGetInvoiceByBookingIdService _getInvoiceByBookingIdService;

        public GetInvoiceByBookingIdHandler(IGetInvoiceByBookingIdService getInvoiceByBookingIdService)
        {
            _getInvoiceByBookingIdService = getInvoiceByBookingIdService;
        }

        public async Task<InvoiceDto> Handle(GetInvoiceByBookingIdQuery request, CancellationToken cancellationToken)
        {
            return await _getInvoiceByBookingIdService.GetByBookingId(request.bookingId, cancellationToken);
        }
    }
}
