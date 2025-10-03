using Application.Features.Bookings.DTOs;
using Application.Features.Bookings.Interfaces.Services.Query.Invoice.GetAllInvoices;
using MediatR;

namespace Application.Features.Bookings.Queries.Invoice.GetAllInvoices
{
    public class GetAllInvoicesHandler : IRequestHandler<GetAllInvoicesQuery, IEnumerable<InvoiceDto>>
    {
        private readonly IGetAllInvoicesService _getAllInvoicesService;

        public GetAllInvoicesHandler(IGetAllInvoicesService getAllInvoicesService)
        {
            _getAllInvoicesService = getAllInvoicesService;
        }

        public async Task<IEnumerable<InvoiceDto>> Handle(GetAllInvoicesQuery request, CancellationToken cancellationToken)
        {
            return await _getAllInvoicesService.GetAllAsync(cancellationToken);
        }
    }
}
