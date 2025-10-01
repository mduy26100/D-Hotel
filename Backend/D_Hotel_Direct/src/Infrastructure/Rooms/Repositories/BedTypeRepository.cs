using Application.Features.Rooms.Repositories;
using Infrastructure.Common.Persistence.Base;
using Infrastructure.Data;

namespace Infrastructure.Rooms.Repositories
{
    public class BedTypeRepository : Repository<BedType>, IBedTypeRepository
    {
        public BedTypeRepository(ApplicationDbContext context) : base(context)
        {
        }
    }
}
