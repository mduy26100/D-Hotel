using Application.Features.Auth.DTOs;

namespace Application.Features.Auth.Services.Query.GetAllUsers
{
    public interface IGetAllUsersService
    {
        Task<IEnumerable<UserProfileDto>> GetAllUsersAsync(string? role = null, CancellationToken cancellationToken = default);
    }
}
