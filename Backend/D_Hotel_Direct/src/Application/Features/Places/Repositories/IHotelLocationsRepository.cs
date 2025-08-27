using Application.Common.Interfaces.Persistence.Base;
using Domain.Models.Places;

namespace Application.Features.Places.Repositories
{
    public interface IHotelLocationsRepository : IRepository<HotelLocations>
    {
        Task<HotelLocations?> GetByHotelIdAsync(int hotelId, CancellationToken cancellationToken = default);

        Task<IEnumerable<HotelLocations>> GetByLocationIdAsync(int locationId, CancellationToken cancellationToken = default);
    }
}
