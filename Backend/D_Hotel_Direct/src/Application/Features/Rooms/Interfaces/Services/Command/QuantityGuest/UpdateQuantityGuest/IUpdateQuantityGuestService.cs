using Application.Features.Rooms.DTOs;

namespace Application.Features.Rooms.Interfaces.Services.Command.QuantityGuest.UpdateQuantityGuest
{
    public interface IUpdateQuantityGuestService
    {
        Task UpdateAsync(QuantityGuestDto dto, CancellationToken cancellationToken = default);
    }
}
