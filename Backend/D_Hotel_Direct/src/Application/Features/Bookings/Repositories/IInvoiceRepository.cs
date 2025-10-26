using Domain.Models.Bookings;

namespace Application.Features.Bookings.Repositories
{
    public interface IInvoiceRepository : IRepository<Invoice>
    {
        Task<Invoice?> GetByPaymentIntentIdAsync(string paymentIntentId);
    }
}
