using Application.Features.Utilities.Repositories;
using Infrastructure.Common.Persistence.Base;
using Infrastructure.Data;

namespace Infrastructure.Utilities.Repositories
{
    public class HotelUtilityRepository : Repository<HotelUtility>, IHotelUtilityRepository
    {
        public HotelUtilityRepository(ApplicationDbContext context) : base(context) { }
    }
}
