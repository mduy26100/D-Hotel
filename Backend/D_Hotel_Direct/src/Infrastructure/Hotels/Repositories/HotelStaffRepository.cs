using Application.Features.Hotels.Repositories;
using Infrastructure.Common.Persistence.Base;
using Infrastructure.Data;

namespace Infrastructure.Hotels.Repositories
{
    public class HotelStaffRepository : Repository<HotelStaff>, IHotelStaffRepository
    {
        public HotelStaffRepository(ApplicationDbContext context) : base(context)
        {
        }
    }
}
