using Application.Common.Interfaces.Logging;
using Application.Common.Interfaces.Shared;
using Application.Features.Auth.DTOs;
using Application.Features.Auth.Services.Query.CurrentUser;
using MediatR;

namespace Application.Features.Auth.Queries.CurrentUser
{
    public class CurrentUserQueryHandler : IRequestHandler<CurrentUserQuery, UserProfileDto>
    {
        private readonly ICurrentUserService _currentUserService;
        private readonly ICurrentUserContext _currentUserContext;
        private readonly ILoggingService<CurrentUserQueryHandler> _logger;

        public CurrentUserQueryHandler(
            ICurrentUserService currentUserService,
            ICurrentUserContext currentUserContext,
            ILoggingService<CurrentUserQueryHandler> logger)
        {
            _currentUserService = currentUserService;
            _currentUserContext = currentUserContext;
            _logger = logger;
        }

        public async Task<UserProfileDto> Handle(CurrentUserQuery request, CancellationToken cancellationToken)
        {
            var userId = _currentUserContext.UserId;
            _logger.LogInformation($"[CurrentUser] Fetching user with UserId: {userId}");

            var user = await _currentUserService.GetCurrentUserAsync(userId, cancellationToken);
            return user;
        }
    }
}
