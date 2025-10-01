using Application.Features.Rooms.DTOs;

namespace Application.Features.Rooms.Interfaces.Services.Command.BedType.CreateBedType
{
    public interface ICreateBedTypeService
    {
        Task<BedTypeDto> CreateAsync(BedTypeDto dto, CancellationToken cancellationToken = default);
    }
}
