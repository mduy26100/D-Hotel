using Application.Features.Auth.DTOs;
using Domain.Enums.Auth;

namespace Application.Features.Auth.Services.Command.Login.Strategy
{
    public interface ILoginStrategy
    {
        LoginProvider Provider { get; }
        Task<JwtTokenResponseDto> LoginAsync(LoginRequestDto dto, CancellationToken cancellationToken);
    }
}
