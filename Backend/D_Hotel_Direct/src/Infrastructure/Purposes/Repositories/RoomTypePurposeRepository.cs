using Application.Features.Purposes.Repositories;
using Infrastructure.Common.Persistence.Base;
using Infrastructure.Data;

namespace Infrastructure.Purposes.Repositories
{
    public class RoomTypePurposeRepository : Repository<RoomTypePurpose>, IRoomTypePurposeRepository
    {
        public RoomTypePurposeRepository(ApplicationDbContext context) : base(context)
        {
        }
    }
}
