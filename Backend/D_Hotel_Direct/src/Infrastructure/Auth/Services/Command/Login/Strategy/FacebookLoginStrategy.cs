using Application.Features.Auth.DTOs;
using Domain.Enums.Auth;

namespace Application.Features.Auth.Services.Command.Login.Strategy
{
    public class FacebookLoginStrategy : ILoginStrategy
    {
        public LoginProvider Provider => LoginProvider.Facebook;

        public Task<JwtTokenResponseDto> LoginAsync(LoginRequestDto dto, CancellationToken cancellationToken)
        {
            throw new NotImplementedException();
        }
    }
}
