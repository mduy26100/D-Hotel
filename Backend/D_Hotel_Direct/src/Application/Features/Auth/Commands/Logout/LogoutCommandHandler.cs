using Application.Common.Interfaces.Logging;
using Application.Common.Interfaces.Shared;
using Application.Features.Auth.Services.Command.Logout;
using MediatR;

namespace Application.Features.Auth.Commands.Logout
{
    public class LogoutCommandHandler : IRequestHandler<LogoutCommand>
    {
        private readonly ILogoutService _logoutService;
        private readonly ICurrentUserContext _currentUserContext;
        private readonly ILoggingService<LogoutCommandHandler> _logger;

        public LogoutCommandHandler(
            ILogoutService logoutService,
            ICurrentUserContext currentUserContext,
            ILoggingService<LogoutCommandHandler> logger)
        {
            _logoutService = logoutService;
            _currentUserContext = currentUserContext;
            _logger = logger;
        }

        public async Task<Unit> Handle(LogoutCommand request, CancellationToken cancellationToken)
        {
            var userId = _currentUserContext.UserId;

            _logger.LogInformation($"[Logout] Logout attempt for UserId: {userId} via {request.Provider}");

            try
            {
                await _logoutService.LogoutAsync(userId, request.Provider, cancellationToken);
                _logger.LogInformation($"[Logout] Logout successful for UserId: {userId}");
            }
            catch (Exception ex)
            {
                _logger.LogError($"[Logout] Logout failed for UserId: {userId}", ex);
                throw;
            }

            return Unit.Value;
        }
    }
}
