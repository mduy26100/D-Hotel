using Application.Features.Hotels.DTOs;

namespace Application.Features.Hotels.Interfaces.Services.Command.UpdateHotel
{
    public interface IUpdateHotelService
    {
        Task UpdateAsync(UpsertHotelRequest request, CancellationToken cancellationToken = default);
    }
}
