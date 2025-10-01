using Application.Features.Rooms.Repositories;
using Infrastructure.Common.Persistence.Base;
using Infrastructure.Data;

namespace Infrastructure.Rooms.Repositories
{
    public class QuantityGuestRepository : Repository<QuantityGuest>, IQuantityGuestRepository
    {
        public QuantityGuestRepository(ApplicationDbContext context) : base(context)
        {
        }
    }
}
