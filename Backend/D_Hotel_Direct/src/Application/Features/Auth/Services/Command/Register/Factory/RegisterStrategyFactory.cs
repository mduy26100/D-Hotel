using Application.Features.Auth.Services.Command.Register.Strategy;
using Domain.Enums.Auth;

namespace Application.Features.Auth.Services.Command.Register.Factory
{
    public class RegisterStrategyFactory : IRegisterStrategyFactory
    {
        private readonly IEnumerable<IRegisterStrategy> _strategies;

        public RegisterStrategyFactory(IEnumerable<IRegisterStrategy> strategies)
        {
            _strategies = strategies;
        }

        public IRegisterStrategy GetStrategy(RegisterProvider provider)
        {
            return _strategies.FirstOrDefault(x => x.Provider == provider)
                ?? throw new NotSupportedException($"No strategy found for provider: {provider}");
        }
    }
}
