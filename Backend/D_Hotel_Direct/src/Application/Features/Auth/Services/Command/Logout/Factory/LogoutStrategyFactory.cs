using Application.Features.Auth.Services.Command.Logout.Strategy;
using Domain.Enums.Auth;

namespace Application.Features.Auth.Services.Command.Logout.Factory
{
    public class LogoutStrategyFactory : ILogoutStrategyFactory
    {
        private readonly Dictionary<LoginProvider, ILogoutStrategy> _strategies;

        public LogoutStrategyFactory(IEnumerable<ILogoutStrategy> strategies)
        {
            _strategies = strategies.ToDictionary(s => s.Provider);
        }

        public ILogoutStrategy GetStrategy(LoginProvider provider)
        {
            if (_strategies.TryGetValue(provider, out var strategy))
            {
                return strategy;
            }

            throw new NotImplementedException($"Logout for provider {provider} is not supported.");
        }
    }

}
