using Application.Features.Purposes.DTOs;

namespace Application.Features.Purposes.Interfaces.Services.Command.RoomPurpose.CreateRoomPurpose
{
    public interface ICreateRoomPurposeService
    {
        Task<RoomPurposeDto> CreateAsync(RoomPurposeDto roomPurposeDto, CancellationToken cancellationToken = default);
    }
}
