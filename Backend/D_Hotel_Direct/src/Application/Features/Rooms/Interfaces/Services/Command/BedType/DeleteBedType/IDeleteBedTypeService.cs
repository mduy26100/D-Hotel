using Application.Features.Rooms.DTOs;

namespace Application.Features.Rooms.Interfaces.Services.Command.BedType.DeleteBedType
{
    public interface IDeleteBedTypeService
    {
        Task DeleteAsync(BedTypeDto dto, CancellationToken cancellationToken = default);
    }
}
