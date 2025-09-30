using Application.Features.Purposes.DTOs;

namespace Application.Features.Purposes.Interfaces.Services.Command.RoomTypePurpose.DeleteRoomTypePurpose
{
    public interface IDeleteRoomTypePurposeService
    {
        Task DeleteAsync(RoomTypePurposeDto roomTypePurposeDto, CancellationToken cancellationToken = default);
    }
}
