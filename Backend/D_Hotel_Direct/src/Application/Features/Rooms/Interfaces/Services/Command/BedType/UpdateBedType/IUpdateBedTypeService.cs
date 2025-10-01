using Application.Features.Rooms.DTOs;

namespace Application.Features.Rooms.Interfaces.Services.Command.BedType.UpdateBedType
{
    public interface IUpdateBedTypeService
    {
        Task UpdateAsync(BedTypeDto dto, CancellationToken cancellationToken = default);
    }
}
