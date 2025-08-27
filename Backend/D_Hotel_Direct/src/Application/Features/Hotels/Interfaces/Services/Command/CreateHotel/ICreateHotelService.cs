using Application.Features.Hotels.DTOs;

namespace Application.Features.Hotels.Interfaces.Services.Command.CreateHotel
{
    public interface ICreateHotelService
    {
        Task<HotelDto> CreateAsync(UpsertHotelRequest request, CancellationToken cancellationToken = default);
    }
}
