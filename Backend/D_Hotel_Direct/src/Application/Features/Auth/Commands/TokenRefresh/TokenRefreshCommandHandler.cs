using Application.Common.Interfaces.Logging;
using Application.Features.Auth.DTOs;
using Application.Features.Auth.Services.Command.TokenRefresh;
using MediatR;

namespace Application.Features.Auth.Commands.TokenRefresh
{
    public class TokenRefreshCommandHandler : IRequestHandler<TokenRefreshCommand, JwtTokenResponseDto>
    {
        private readonly ITokenRefreshService _tokenRefreshService;
        private readonly ILoggingService<TokenRefreshCommandHandler> _logger;

        public TokenRefreshCommandHandler(
            ITokenRefreshService tokenRefreshService,
            ILoggingService<TokenRefreshCommandHandler> logger)
        {
            _tokenRefreshService = tokenRefreshService;
            _logger = logger;
        }

        public async Task<JwtTokenResponseDto> Handle(TokenRefreshCommand request, CancellationToken cancellationToken)
        {
            _logger.LogInformation("[TokenRefresh] Refresh token attempt");

            try
            {
                var result = await _tokenRefreshService.RefreshTokenAsync(request.RefreshToken, cancellationToken);
                _logger.LogInformation("[TokenRefresh] Refresh token successful");
                return result;
            }
            catch (Exception ex)
            {
                _logger.LogError("[TokenRefresh] Refresh token failed", ex);
                throw;
            }
        }
    }
}
