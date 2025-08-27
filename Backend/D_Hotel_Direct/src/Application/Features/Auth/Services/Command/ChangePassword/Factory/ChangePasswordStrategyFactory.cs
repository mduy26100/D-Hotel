using Application.Features.Auth.Services.Command.ChangePassword.Strategy;
using Domain.Enums.Auth;

namespace Application.Features.Auth.Services.Command.ChangePassword.Factory
{
    public class ChangePasswordStrategyFactory : IChangePasswordStrategyFactory
    {
        private readonly Dictionary<ChangePasswordMethod, IChangePasswordStrategy> _strategies;

        public ChangePasswordStrategyFactory(IEnumerable<IChangePasswordStrategy> strategies)
        {
            _strategies = strategies.ToDictionary(s => s.Method);
        }

        public IChangePasswordStrategy GetStrategy(ChangePasswordMethod method)
        {
            if (_strategies.TryGetValue(method, out var strategy))
                return strategy;

            throw new NotImplementedException($"Change password method '{method}' not supported.");
        }
    }
}
