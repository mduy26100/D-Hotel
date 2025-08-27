using Application.Features.Auth.DTOs;
using Application.Features.Auth.Services.Command.ChangePassword.Strategy;
using Domain.Enums.Auth;

namespace Infrastructure.Auth.Services.Command.ChangePassword.Strategy
{
    public class SelfChangePasswordStrategy : IChangePasswordStrategy
    {
        public ChangePasswordMethod Method => ChangePasswordMethod.Self;

        private readonly UserManager<ApplicationUser> _userManager;

        public SelfChangePasswordStrategy(UserManager<ApplicationUser> userManager)
        {
            _userManager = userManager;
        }

        public async Task ChangePasswordAsync(Guid userId, ChangePasswordDto dto, CancellationToken cancellationToken)
        {
            if (dto.NewPassword != dto.ConfirmNewPassword)
                throw new ArgumentException("New password and confirmation do not match.");

            var user = await _userManager.FindByIdAsync(userId.ToString());
            if (user == null)
                throw new KeyNotFoundException("User not found.");

            var result = await _userManager.ChangePasswordAsync(user, dto.CurrentPassword!, dto.NewPassword);
            if (!result.Succeeded)
            {
                var errors = string.Join("; ", result.Errors.Select(e => e.Description));
                throw new InvalidOperationException($"Password change failed: {errors}");
            }
        }
    }
}
