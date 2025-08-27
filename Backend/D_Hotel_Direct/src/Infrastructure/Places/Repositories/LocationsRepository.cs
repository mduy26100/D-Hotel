using Application.Features.Places.Repositories;
using Domain.Models.Places;
using Infrastructure.Common.Persistence.Base;
using Infrastructure.Data;

namespace Infrastructure.Places.Repositories
{
    public class LocationsRepository : Repository<Locations>, ILocationsRepository
    {
        public LocationsRepository(ApplicationDbContext context) : base(context)
        {
        }
    }
}
