using Application.Features.Auth.Services.Command.Register.Strategy;
using Domain.Enums.Auth;

namespace Application.Features.Auth.Services.Command.Register.Factory
{
    public interface IRegisterStrategyFactory
    {
        IRegisterStrategy GetStrategy(RegisterProvider provider);
    }
}
