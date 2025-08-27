using Application.Common.Interfaces.Persistence.Base;
using Domain.Models.Hotels;

namespace Application.Features.Hotels.Repositories
{
    public interface IHotelRepository : IRepository<Hotel>
    {
        Task<IEnumerable<Hotel>> GetByCategoryIdAsync(int categoryId, CancellationToken cancellationToken = default);
    }
}
