using Application.Features.Hotels.DTOs;
using Application.Features.Hotels.Repositories;
using Application.Features.Utilities.DTOs;
using Infrastructure.Common.Persistence.Base;
using Infrastructure.Data;

namespace Infrastructure.Hotels.Repositories
{
    public class HotelRepository : Repository<Hotel>, IHotelRepository
    {
        public HotelRepository(ApplicationDbContext context) : base(context)
        {
        }
    }
}
