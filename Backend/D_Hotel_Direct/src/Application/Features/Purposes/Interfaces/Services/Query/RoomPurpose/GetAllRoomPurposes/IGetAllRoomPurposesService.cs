using Application.Features.Purposes.DTOs;

namespace Application.Features.Purposes.Interfaces.Services.Query.RoomPurpose.GetAllRoomPurposes
{
    public interface IGetAllRoomPurposesService
    {
        Task<IEnumerable<RoomPurposeDto>> GetAllAsync(CancellationToken cancellationToken = default);
    }
}
