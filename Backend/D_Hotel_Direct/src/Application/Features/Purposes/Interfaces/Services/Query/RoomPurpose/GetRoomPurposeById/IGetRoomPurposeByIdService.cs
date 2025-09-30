using Application.Features.Purposes.DTOs;

namespace Application.Features.Purposes.Interfaces.Services.Query.RoomPurpose.GetRoomPurposeById
{
    public interface IGetRoomPurposeByIdService
    {
        Task<RoomPurposeDto> GetByIdAsync(int id, CancellationToken cancellationToken = default);
    }
}
