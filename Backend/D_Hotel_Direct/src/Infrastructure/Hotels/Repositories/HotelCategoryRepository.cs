using Application.Features.Hotels.Repositories;
using Infrastructure.Common.Persistence.Base;
using Infrastructure.Data;

namespace Infrastructure.Hotels.Repositories
{
    public class HotelCategoryRepository : Repository<HotelCategory>, IHotelCategoryRepository
    {
        public HotelCategoryRepository(ApplicationDbContext context) : base(context)
        {
        }
    }
}
