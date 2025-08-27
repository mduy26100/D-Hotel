using Application.Features.Utilities.DTOs;

namespace Application.Features.Utilities.Interfaces.Services.Command.CreateHotelUtility
{
    public interface ICreateHotelUtilityService
    {
        public Task<HotelUtilityDto> CreateAsync(HotelUtilityDto request, CancellationToken cancellationToken = default);
    }
}
