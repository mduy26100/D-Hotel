using Application.Features.Bookings.DTOs;
using Application.Features.Bookings.Interfaces.Services.Query.Invoice.GetInvoiceById;
using Application.Features.Bookings.Repositories;
using AutoMapper;

namespace Application.Features.Bookings.Services.Query.Invoice.GetInvoiceById
{
    public class GetInvoiceByIdService : IGetInvoiceByIdService
    {
        private readonly IInvoiceRepository _invoiceRepository;
        private readonly IMapper _mapper;

        public GetInvoiceByIdService(IInvoiceRepository invoiceRepository
            , IMapper mapper)
        {
            _invoiceRepository = invoiceRepository;
            _mapper = mapper;
        }

        public async Task<InvoiceDto> GetByIdAsync(int id, CancellationToken cancellationToken = default)
        {
            var invoice = await _invoiceRepository.GetByIdAsync(id, cancellationToken);
            return _mapper.Map<InvoiceDto>(invoice);
        }
    }
}
