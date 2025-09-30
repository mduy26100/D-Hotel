using Application.Features.Purposes.DTOs;

namespace Application.Features.Purposes.Interfaces.Services.Command.RoomTypePurpose.UpdateRoomTypePurpose
{
    public interface IUpdateRoomTypePurposeService
    {
        Task UpdateAsync(RoomTypePurposeDto roomTypePurposeDto, CancellationToken cancellationToken = default);
    }
}
