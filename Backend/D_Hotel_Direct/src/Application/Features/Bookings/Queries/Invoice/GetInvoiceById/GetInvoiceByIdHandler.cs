using Application.Features.Bookings.DTOs;
using Application.Features.Bookings.Interfaces.Services.Query.Invoice.GetInvoiceById;
using MediatR;

namespace Application.Features.Bookings.Queries.Invoice.GetInvoiceById
{
    public class GetInvoiceByIdHandler : IRequestHandler<GetInvoiceByIdQuery, InvoiceDto>
    {
        private readonly IGetInvoiceByIdService _getInvoiceByIdService;

        public GetInvoiceByIdHandler(IGetInvoiceByIdService getInvoiceByIdService)
        {
            _getInvoiceByIdService = getInvoiceByIdService;
        }

        public async Task<InvoiceDto> Handle(GetInvoiceByIdQuery request, CancellationToken cancellationToken)
        {
            return await _getInvoiceByIdService.GetByIdAsync(request.id, cancellationToken);
        }
    }
}
