using Application.Common.Interfaces.Persistence.Base;
using Domain.Models.Hotels;

namespace Application.Features.Hotels.Repositories
{
    public interface IHotelCategoryRepository : IRepository<HotelCategory>
    {
    }
}
