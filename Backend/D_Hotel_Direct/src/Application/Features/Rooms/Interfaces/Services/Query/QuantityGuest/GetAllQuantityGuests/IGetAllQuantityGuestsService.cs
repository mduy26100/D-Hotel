using Application.Features.Rooms.DTOs;

namespace Application.Features.Rooms.Interfaces.Services.Query.QuantityGuest.GetAllQuantityGuests
{
    public interface IGetAllQuantityGuestsService
    {
        Task<IEnumerable<QuantityGuestDto>> GetAllAsync(CancellationToken cancellationToken = default);
    }
}
