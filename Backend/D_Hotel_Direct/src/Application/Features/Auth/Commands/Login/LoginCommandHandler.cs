using Application.Common.Interfaces.Logging;
using Application.Features.Auth.DTOs;
using Application.Features.Auth.Services.Command.Login;
using MediatR;

namespace Application.Features.Auth.Commands.Login
{
    public class LoginCommandHandler : IRequestHandler<LoginCommand, JwtTokenResponseDto>
    {
        private readonly ILoginService _loginService;
        private readonly ILoggingService<LoginCommandHandler> _logger;

        public LoginCommandHandler(
            ILoginService loginService,
            ILoggingService<LoginCommandHandler> logger)
        {
            _loginService = loginService;
            _logger = logger;
        }

        public async Task<JwtTokenResponseDto> Handle(LoginCommand request, CancellationToken cancellationToken)
        {
            _logger.LogInformation("[Login] Login attempt for user: " + request.Dto.Email);

            try
            {
                var result = await _loginService.LoginAsync(request.Dto, cancellationToken);
                _logger.LogInformation("[Login] Login successful for user: " + request.Dto.Email);
                return result;
            }
            catch (Exception ex)
            {
                _logger.LogError("[Login] Login failed for user: " + request.Dto.Email, ex);
                throw;
            }
        }
    }
}
