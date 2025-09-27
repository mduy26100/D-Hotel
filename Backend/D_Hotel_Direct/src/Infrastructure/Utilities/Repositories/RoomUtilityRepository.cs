using Application.Features.Utilities.Repositories;
using Infrastructure.Common.Persistence.Base;
using Infrastructure.Data;

namespace Infrastructure.Utilities.Repositories
{
    public class RoomUtilityRepository : Repository<RoomUtility>, IRoomUtilityRepository
    {
        public RoomUtilityRepository(ApplicationDbContext context) : base(context) { }
    }
}
