using Application.Features.Purposes.DTOs;

namespace Application.Features.Purposes.Interfaces.Services.Command.RoomTypePurpose.CreateRoomTypePurpose
{
    public interface ICreateRoomTypePurposeService
    {
        Task<RoomTypePurposeDto> CreateAsync(RoomTypePurposeDto roomTypePurposeDto, CancellationToken cancellationToken = default);
    }
}
