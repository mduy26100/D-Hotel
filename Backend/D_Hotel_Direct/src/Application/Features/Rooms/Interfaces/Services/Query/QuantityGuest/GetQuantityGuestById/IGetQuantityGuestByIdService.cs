using Application.Features.Rooms.DTOs;

namespace Application.Features.Rooms.Interfaces.Services.Query.QuantityGuest.GetQuantityGuestById
{
    public interface IGetQuantityGuestByIdService
    {
        Task<QuantityGuestDto> GetByIdAsync(int id, CancellationToken cancellationToken = default);
    }
}
