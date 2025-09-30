using Application.Features.Purposes.Repositories;
using Infrastructure.Common.Persistence.Base;
using Infrastructure.Data;

namespace Infrastructure.Purposes.Repositories
{
    public class HotelTravelPurposeRepository : Repository<HotelTravelPurpose>, IHotelTravelPurposeRepository
    {
        public HotelTravelPurposeRepository(ApplicationDbContext context) : base(context)
        {
        }
    }
}
