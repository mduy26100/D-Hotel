using Application.Features.Auth.DTOs;
using Domain.Enums.Auth;

namespace Application.Features.Auth.Services.Command.Logout
{
    public interface ILogoutService
    {
        Task LogoutAsync(Guid userId, LoginProvider provider, CancellationToken cancellationToken = default);
    }
}
