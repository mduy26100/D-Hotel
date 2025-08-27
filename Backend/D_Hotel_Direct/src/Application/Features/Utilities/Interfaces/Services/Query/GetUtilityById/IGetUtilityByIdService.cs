using Application.Features.Utilities.DTOs;

namespace Application.Features.Utilities.Interfaces.Services.Query.GetUtilityById
{
    public interface IGetUtilityByIdService
    {
        Task<UtilityDto?> GetByIdAsync(int id, CancellationToken cancellationToken = default);
    }
}