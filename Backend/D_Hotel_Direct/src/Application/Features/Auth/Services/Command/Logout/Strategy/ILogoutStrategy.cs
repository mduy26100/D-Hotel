using Domain.Enums.Auth;

namespace Application.Features.Auth.Services.Command.Logout.Strategy
{
    public interface ILogoutStrategy
    {
        LoginProvider Provider { get; }

        Task LogoutAsync(Guid userId, CancellationToken cancellationToken = default);
    }
}
