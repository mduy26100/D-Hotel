using Application.Features.Rooms.DTOs;

namespace Application.Features.Rooms.Interfaces.Services.Query.BedType.GetAllBedTypes
{
    public interface IGetAllBedTypesService
    {
        Task<IEnumerable<BedTypeDto>> GetAllAsync(CancellationToken cancellationToken = default);
    }
}
