using Application.Features.Rooms.Repositories;
using Infrastructure.Common.Persistence.Base;
using Infrastructure.Data;

namespace Infrastructure.Rooms.Repositories
{
    public class RoomTypePriceRepository : Repository<RoomTypePrice>, IRoomTypePriceRepository
    {
        public RoomTypePriceRepository(ApplicationDbContext context) : base(context)
        {
        }
    }
}
