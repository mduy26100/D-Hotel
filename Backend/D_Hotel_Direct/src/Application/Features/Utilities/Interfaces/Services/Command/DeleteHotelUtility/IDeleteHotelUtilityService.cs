using Application.Features.Utilities.DTOs;

namespace Application.Features.Utilities.Interfaces.Services.Command.DeleteHotelUtility
{
    public interface IDeleteHotelUtilityService
    {
        Task DeleteAsync(HotelUtilityDto request, CancellationToken cancellationToken = default);
    }
}
