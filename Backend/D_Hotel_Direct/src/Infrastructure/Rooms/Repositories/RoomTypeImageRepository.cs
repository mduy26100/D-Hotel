using Application.Features.Rooms.Repositories;
using Infrastructure.Common.Persistence.Base;
using Infrastructure.Data;

namespace Infrastructure.Rooms.Repositories
{
    public class RoomTypeImageRepository : Repository<RoomTypeImage>, IRoomTypeImageRepository
    {
        public RoomTypeImageRepository(ApplicationDbContext context) : base(context)
        {
        }
    }
}
