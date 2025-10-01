using Application.Features.Rooms.DTOs;

namespace Application.Features.Rooms.Interfaces.Services.Command.QuantityGuest.DeleteQuantityGuest
{
    public interface IDeleteQuantityGuestService
    {
        Task DeleteAsync(QuantityGuestDto dto, CancellationToken cancellationToken = default);
    }
}
