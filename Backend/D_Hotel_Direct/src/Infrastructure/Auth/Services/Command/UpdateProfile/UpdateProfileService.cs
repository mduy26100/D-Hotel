using Application.Features.Auth.DTOs;
using Application.Features.Auth.Services.Command.UpdateProfile;
using Application.Features.Auth.Services.Command.UpdateProfile.Factory;
using Microsoft.AspNetCore.Http;
using System.Security.Claims;

namespace Infrastructure.Auth.Services.Command.UpdateProfile
{
    public class UpdateProfileService : IUpdateProfileService
    {
        private readonly IUpdateProfileStrategyFactory _strategyFactory;
        private readonly IHttpContextAccessor _httpContextAccessor;

        public UpdateProfileService(IUpdateProfileStrategyFactory strategyFactory, IHttpContextAccessor httpContextAccessor)
        {
            _strategyFactory = strategyFactory;
            _httpContextAccessor = httpContextAccessor;
        }

        public async Task UpdateProfileAsync(UpdateProfileDto dto, CancellationToken cancellationToken = default)
        {
            var httpContext = _httpContextAccessor.HttpContext;
            if (httpContext == null)
                throw new InvalidOperationException("No http context");

            var currentUserIdStr = httpContext.User.FindFirstValue(ClaimTypes.NameIdentifier);
            if (!Guid.TryParse(currentUserIdStr, out var currentUserId))
                throw new InvalidOperationException("Cannot resolve current user id");

            if (currentUserId == dto.Id)
            {
                var strategy = _strategyFactory.GetSelfStrategy();
                await strategy.UpdateAsync(dto, cancellationToken);
                return;
            }

            var currentUserRole = httpContext.User.FindFirstValue(ClaimTypes.Role);
            if (currentUserRole != Roles.Manager)
                throw new UnauthorizedAccessException("You do not have permission to update other users' profiles.");

            var strategyManager = _strategyFactory.GetManagerStrategy();
            await strategyManager.UpdateAsync(dto, cancellationToken);
        }
    }
}
