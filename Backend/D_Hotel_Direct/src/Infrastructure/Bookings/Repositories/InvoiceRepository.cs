using Application.Features.Bookings.Repositories;
using Infrastructure.Common.Persistence.Base;
using Infrastructure.Data;

namespace Infrastructure.Bookings.Repositories
{
    public class InvoiceRepository : Repository<Invoice>, IInvoiceRepository
    {
        public InvoiceRepository(ApplicationDbContext context) : base(context)
        {

        }

        public async Task<Invoice?> GetByPaymentIntentIdAsync(string paymentIntentId)
        {
            return await _context.Invoices
               .FirstOrDefaultAsync(i => i.PaymentIntentId == paymentIntentId);
        }
    }
}
