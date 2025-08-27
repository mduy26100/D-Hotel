using Application.Common.Interfaces.Persistence.Base;
using Domain.Models.Utilities;

namespace Application.Features.Utilities.Repositories
{
    public interface IHotelUtilityRepository : IRepository<HotelUtility>
    {
        Task<IEnumerable<HotelUtility>> GetByHotelIdAsync(int hotelTypeId, CancellationToken cancellationToken = default);
    }
}
