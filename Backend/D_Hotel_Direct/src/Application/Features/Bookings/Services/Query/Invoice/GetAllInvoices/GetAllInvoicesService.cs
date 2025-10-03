using Application.Features.Bookings.DTOs;
using Application.Features.Bookings.Interfaces.Services.Query.Invoice.GetAllInvoices;
using Application.Features.Bookings.Repositories;
using AutoMapper;

namespace Application.Features.Bookings.Services.Query.Invoice.GetAllInvoices
{
    public class GetAllInvoicesService : IGetAllInvoicesService
    {
        private readonly IInvoiceRepository _invoiceRepository;
        private readonly IMapper _mapper;

        public GetAllInvoicesService(IInvoiceRepository invoiceRepository
            , IMapper mapper)
        {
            _invoiceRepository = invoiceRepository;
            _mapper = mapper;
        }

        public async Task<IEnumerable<InvoiceDto>> GetAllAsync(CancellationToken cancellationToken = default)
        {
            var invoices = await _invoiceRepository.GetAllAsync(cancellationToken);
            return _mapper.Map<IEnumerable<InvoiceDto>>(invoices);
        }
    }
}
