using Application.Common.Interfaces.Logging;
using Application.Common.Interfaces.Shared;
using Application.Features.Auth.Services.Command.ChangePassword;
using MediatR;

namespace Application.Features.Auth.Commands.ChangePassword
{
    public class ChangePasswordCommandHandler : IRequestHandler<ChangePasswordCommand>
    {
        private readonly IChangePasswordService _changePasswordService;
        private readonly ICurrentUserContext _currentUserContext;
        private readonly ILoggingService<ChangePasswordCommandHandler> _logger;

        public ChangePasswordCommandHandler(IChangePasswordService changePasswordService
            , ICurrentUserContext currentUserContext
            , ILoggingService<ChangePasswordCommandHandler> logger)
        {
            _changePasswordService = changePasswordService;
            _currentUserContext = currentUserContext;
            _logger = logger;
        }

        public async Task<Unit> Handle(ChangePasswordCommand request, CancellationToken cancellationToken)
        {
            var userId = _currentUserContext.UserId;
            _logger.LogInformation($"[ChangePassword] Start handling for UserId: {userId}");

            try
            {
                await _changePasswordService.ChangePasswordAsync(userId, request.Dto, cancellationToken);
                _logger.LogInformation("[ChangePassword] Password changed successfully");
            }
            catch (Exception ex)
            {
                _logger.LogError("[ChangePassword] Failed to change password", ex);
                throw;
            }

            return Unit.Value;
        }
    }
}
