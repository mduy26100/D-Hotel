using Application.Features.Purposes.DTOs;

namespace Application.Features.Purposes.Interfaces.Services.Command.RoomPurpose.UpdateRoomPurpose
{
    public interface IUpdateRoomPurposeService
    {
        Task UpdateAsync(RoomPurposeDto roomPurposeDto, CancellationToken cancellationToken = default);
    }
}
