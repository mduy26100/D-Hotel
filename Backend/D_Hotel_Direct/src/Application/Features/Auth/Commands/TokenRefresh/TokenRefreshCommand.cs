using Application.Features.Auth.DTOs;
using MediatR;

namespace Application.Features.Auth.Commands.TokenRefresh
{
    public record TokenRefreshCommand(string RefreshToken) : IRequest<JwtTokenResponseDto>;
}
