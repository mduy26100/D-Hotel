using Application.Common.Interfaces.Persistence.Base;
using Domain.Models.Places;

namespace Application.Features.Places.Repositories
{
    public interface ILocationsRepository : IRepository<Locations>
    {
    }
}
