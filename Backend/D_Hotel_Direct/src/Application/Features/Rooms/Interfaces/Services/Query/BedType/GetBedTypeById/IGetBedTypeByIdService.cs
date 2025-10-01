using Application.Features.Rooms.DTOs;

namespace Application.Features.Rooms.Interfaces.Services.Query.BedType.GetBedTypeById
{
    public interface IGetBedTypeByIdService
    {
        Task<BedTypeDto> GetByIdAsync(int id, CancellationToken cancellationToken);
    }
}
