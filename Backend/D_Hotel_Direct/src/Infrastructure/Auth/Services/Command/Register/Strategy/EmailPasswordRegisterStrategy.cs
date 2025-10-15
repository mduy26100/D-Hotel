using Application.Common.Interfaces.Shared;
using Application.Features.Auth.DTOs;
using Application.Features.Auth.Services.Command.Register.Strategy;
using Domain.Enums.Auth;

namespace Infrastructure.Auth.Services.Command.Register.Strategy
{
    public class EmailPasswordRegisterStrategy : IRegisterStrategy
    {
        public RegisterProvider Provider => RegisterProvider.EmailPassword;

        private readonly UserManager<ApplicationUser> _userManager;
        private readonly ICurrentUserContext _currentUserContext;

        public EmailPasswordRegisterStrategy(
            UserManager<ApplicationUser> userManager,
            ICurrentUserContext currentUserContext)
        {
            _userManager = userManager;
            _currentUserContext = currentUserContext;
        }

        public async Task RegisterAsync(RegisterRequestDto dto, CancellationToken cancellationToken = default)
        {
            // Kiểm tra email trùng
            if (await _userManager.FindByEmailAsync(dto.Email) is not null)
                throw new InvalidOperationException("Email is already in use.");

            // Kiểm tra username trùng
            var usernameExists = await _userManager.Users.AnyAsync(u => u.UserName == dto.UserName, cancellationToken);
            if (usernameExists)
                throw new InvalidOperationException("Username is already taken.");

            // Xác nhận mật khẩu
            if (dto.Password != dto.ConfirmPassword)
                throw new InvalidOperationException("Password confirmation does not match.");

            // Tạo user mới
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

            var currentRoles = _currentUserContext.Roles;
            var isManager = currentRoles.Contains(Roles.Manager);

            var roleToAssign = isManager && !string.IsNullOrWhiteSpace(dto.Role)
                ? dto.Role
                : Roles.User;

            await _userManager.AddToRoleAsync(user, roleToAssign);
        }
    }
}
