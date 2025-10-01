using Application.Features.Rooms.DTOs;

namespace Application.Features.Rooms.Interfaces.Services.Command.QuantityGuest.CreateQuantityGuest
{
    public interface ICreateQuantityGuestService
    {
        Task<QuantityGuestDto> CreateAsync(QuantityGuestDto dto, CancellationToken cancellationToken = default);
    }
}
