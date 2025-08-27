using Application.Features.Hotels.DTOs;

namespace Application.Features.Hotels.Interfaces.Services.Command.DeleteHotel
{
    public interface IDeleteHotelService
    {
        Task DeleteAsync(HotelDto hotelDto, CancellationToken cancellationToken = default);
    }
}
