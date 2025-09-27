using Application.Common.Interfaces.Persistence.Base;
using Domain.Models.Hotels;

namespace Application.Features.Hotels.Repositories
{
    public interface IHotelStaffRepository : IRepository<HotelStaff>
    {
        Task<IEnumerable<HotelStaff>> GetStaffsByHotelIdAsync(int hotelId, CancellationToken cancellationToken);
    }
}
