using Application.Features.Purposes.DTOs;

namespace Application.Features.Purposes.Interfaces.Services.Command.RoomPurpose.DeleteRoomPurpose
{
    public interface IDeleteRoomPurposeService
    {
        Task DeleteAsync(RoomPurposeDto roomPurposeDto, CancellationToken cancellationToken = default);
    }
}
