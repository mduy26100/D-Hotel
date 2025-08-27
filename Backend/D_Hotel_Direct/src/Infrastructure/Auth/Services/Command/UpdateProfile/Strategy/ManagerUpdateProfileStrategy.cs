using Application.Common.Interfaces.Services.FileUpLoad;
using Application.Common.Models;
using Application.Features.Auth.DTOs;
using Application.Features.Auth.Services.Command.UpdateProfile.Strategy;

namespace Infrastructure.Auth.Services.Command.UpdateProfile.Strategy
{
    public class ManagerUpdateProfileStrategy : IUpdateProfileStrategy
    {
        private readonly UserManager<ApplicationUser> _userManager;
        private readonly RoleManager<ApplicationRole> _roleManager;
        private readonly IFileUploadService _fileUploadService;

        public ManagerUpdateProfileStrategy(
            UserManager<ApplicationUser> userManager,
            RoleManager<ApplicationRole> roleManager,
            IFileUploadService fileUploadService)
        {
            _userManager = userManager;
            _roleManager = roleManager;
            _fileUploadService = fileUploadService;
        }

        public async Task UpdateAsync(UpdateProfileDto dto, CancellationToken cancellationToken = default)
        {
            var user = await _userManager.FindByIdAsync(dto.Id.ToString());
            if (user == null)
                throw new InvalidOperationException("User not found.");

            if (dto.AvatarImageContent != null && !string.IsNullOrWhiteSpace(dto.AvatarImageFileName))
            {
                var uploadRequest = new FileUploadRequest
                {
                    Content = dto.AvatarImageContent,
                    FileName = dto.AvatarImageFileName!,
                    ContentType = dto.AvatarImageContentType ?? "image/jpeg"
                };
                user.AvatarUrl = await _fileUploadService.UploadAsync(uploadRequest, cancellationToken);
            }

            user.FirstName = dto.FirstName;
            user.LastName = dto.LastName;
            user.PhoneNumber = dto.PhoneNumber;

            var result = await _userManager.UpdateAsync(user);
            if (!result.Succeeded)
                throw new InvalidOperationException("Failed to update user.");

            if (!string.IsNullOrWhiteSpace(dto.Role))
            {
                var roles = await _userManager.GetRolesAsync(user);
                await _userManager.RemoveFromRolesAsync(user, roles);

                if (!await _roleManager.RoleExistsAsync(dto.Role))
                    throw new InvalidOperationException("Role not found");

                await _userManager.AddToRoleAsync(user, dto.Role);
            }
        }
    }
}