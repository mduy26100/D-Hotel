using Application.Features.Auth.DTOs;
using Application.Features.Auth.Services.Command.TokenRefresh;
using Microsoft.Extensions.Logging;

namespace Infrastructure.Auth.Services.Command.TokenRefresh.Decorators
{
    public class LogTokenRefreshDecorator : ITokenRefreshService
    {
        private readonly ITokenRefreshService _inner;
        private readonly ILogger<LogTokenRefreshDecorator> _logger;

        public LogTokenRefreshDecorator(ITokenRefreshService inner, ILogger<LogTokenRefreshDecorator> logger)
        {
            _inner = inner;
            _logger = logger;
        }

        public async Task<JwtTokenResponseDto> RefreshTokenAsync(string refreshToken, CancellationToken cancellationToken = default)
        {
            _logger.LogInformation("Attempting to refresh token: {RefreshToken}", refreshToken);

            try
            {
                var result = await _inner.RefreshTokenAsync(refreshToken, cancellationToken);

                _logger.LogInformation("Successfully refreshed token for user.");
                return result;
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Failed to refresh token.");
                throw;
            }
        }
    }
}
