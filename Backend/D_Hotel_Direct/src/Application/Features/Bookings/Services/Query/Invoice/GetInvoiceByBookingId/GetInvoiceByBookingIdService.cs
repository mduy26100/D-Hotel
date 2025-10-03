using Application.Features.Bookings.DTOs;
using Application.Features.Bookings.Interfaces.Services.Query.Invoice.GetInvoiceByBookingId;
using Application.Features.Bookings.Repositories;
using AutoMapper;

namespace Application.Features.Bookings.Services.Query.Invoice.GetInvoiceByBookingId
{
    public class GetInvoiceByBookingIdService : IGetInvoiceByBookingIdService
    {
        private readonly IInvoiceRepository _invoiceRepository;
        private readonly IMapper _mapper;

        public GetInvoiceByBookingIdService(IInvoiceRepository invoiceRepository
            , IMapper mapper)
        {
            _invoiceRepository = invoiceRepository;
            _mapper = mapper;
        }

        public async Task<InvoiceDto> GetByBookingId(int bookingId, CancellationToken cancellationToken = default)
        {
            var invoice = await _invoiceRepository.FindOneAsync(h => h.BookingId == bookingId, cancellationToken);
            return _mapper.Map<InvoiceDto>(invoice);
        }
    }
}
