using Application.Features.Purposes.DTOs;

namespace Application.Features.Purposes.Interfaces.Services.Query.RoomTypePurpose.GetAllRoomTypePurposes
{
    public interface IGetAllRoomTypePurposesService
    {
        Task<IEnumerable<RoomTypePurposeDto>> GetAllAsync(CancellationToken cancellationToken = default);
    }
}
