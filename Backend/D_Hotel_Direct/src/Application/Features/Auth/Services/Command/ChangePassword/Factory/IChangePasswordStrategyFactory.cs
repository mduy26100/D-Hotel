using Application.Features.Auth.Services.Command.ChangePassword.Strategy;
using Domain.Enums.Auth;

namespace Application.Features.Auth.Services.Command.ChangePassword.Factory
{
    public interface IChangePasswordStrategyFactory
    {
        IChangePasswordStrategy GetStrategy(ChangePasswordMethod method);
    }
}
