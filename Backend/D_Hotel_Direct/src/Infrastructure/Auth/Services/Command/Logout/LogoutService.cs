using Application.Features.Auth.Services.Command.Logout;
using Application.Features.Auth.Services.Command.Logout.Factory;
using Domain.Enums.Auth;

namespace Infrastructure.Auth.Services.Command.Logout
{
    public class LogoutService : ILogoutService
    {
        private readonly ILogoutStrategyFactory _strategyFactory;

        public LogoutService(ILogoutStrategyFactory strategyFactory)
        {
            _strategyFactory = strategyFactory;
        }

        public Task LogoutAsync(Guid userId, LoginProvider provider, CancellationToken cancellationToken = default)
        {
            var strategy = _strategyFactory.GetStrategy(provider);
            return strategy.LogoutAsync(userId, cancellationToken);
        }
    }
}