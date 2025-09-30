using Application.Features.Purposes.Repositories;
using Infrastructure.Common.Persistence.Base;
using Infrastructure.Data;

namespace Infrastructure.Purposes.Repositories
{
    public class TravelPurposeRepository : Repository<TravelPurpose>, ITravelPurposeRepository
    {
        public TravelPurposeRepository(ApplicationDbContext context) : base(context)
        {
        }
    }
}
