using Application.Features.Auth.Services.Command.Logout.Strategy;
using Domain.Enums.Auth;

namespace Application.Features.Auth.Services.Command.Logout.Factory
{
    public interface ILogoutStrategyFactory
    {
        ILogoutStrategy GetStrategy(LoginProvider provider);
    }
}
