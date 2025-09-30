using Application.Features.Purposes.Repositories;
using Infrastructure.Common.Persistence.Base;
using Infrastructure.Data;

namespace Infrastructure.Purposes.Repositories
{
    public class RoomPurposeRepository : Repository<RoomPurpose>, IRoomPurposeRepository
    {
        public RoomPurposeRepository(ApplicationDbContext context) : base(context)
        {
        }
    }
}
