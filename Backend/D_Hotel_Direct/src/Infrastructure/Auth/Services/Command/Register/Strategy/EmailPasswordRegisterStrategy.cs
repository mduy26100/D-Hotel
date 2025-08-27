using Application.Features.Auth.DTOs;
using Application.Features.Auth.Services.Command.Register.Strategy;
using Domain.Enums.Auth;

namespace Infrastructure.Auth.Services.Command.Register.Strategy
{
    public class EmailPasswordRegisterStrategy : IRegisterStrategy
    {
        public RegisterProvider Provider => RegisterProvider.EmailPassword;

        private readonly UserManager<ApplicationUser> _userManager;

        public EmailPasswordRegisterStrategy(UserManager<ApplicationUser> userManager)
        {
            _userManager = userManager;
        }

        public async Task RegisterAsync(RegisterRequestDto dto, CancellationToken cancellationToken = default)
        {
            if (await _userManager.FindByEmailAsync(dto.Email) is not null)
                throw new InvalidOperationException("Email is already in use.");

            var usernameExists = await _userManager.Users.AnyAsync(u => u.UserName == dto.UserName, cancellationToken);
            if (usernameExists)
                throw new InvalidOperationException("Username is already taken.");

            if (dto.Password != dto.ConfirmPassword)
                throw new InvalidOperationException("Password confirmation does not match.");

            var user = new ApplicationUser
            {
                UserName = dto.UserName,
                Email = dto.Email,
                FirstName = dto.FirstName,
                LastName = dto.LastName,
                PhoneNumber = dto.PhoneNumber,
                EmailConfirmed = true
            };

            var result = await _userManager.CreateAsync(user, dto.Password);
            if (!result.Succeeded)
            {
                var errors = string.Join("; ", result.Errors.Select(e => e.Description));
                throw new InvalidOperationException($"Failed to create user: {errors}");
            }

            var role = string.IsNullOrWhiteSpace(dto.Role) ? Roles.User : dto.Role;
            await _userManager.AddToRoleAsync(user, role);
        }
    }
}
