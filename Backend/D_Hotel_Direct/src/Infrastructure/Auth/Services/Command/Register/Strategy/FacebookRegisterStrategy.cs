using Application.Features.Auth.DTOs;
using Application.Features.Auth.Services.Command.Register.Strategy;
using Domain.Enums.Auth;

namespace Infrastructure.Auth.Services.Command.Register.Strategy
{
    public class FacebookRegisterStrategy : IRegisterStrategy
    {
        public RegisterProvider Provider => RegisterProvider.Facebook;

        public Task RegisterAsync(RegisterRequestDto dto, CancellationToken cancellationToken = default)
        {
            throw new NotImplementedException();
        }
    }
}
