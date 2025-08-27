using Application.Common.Interfaces.Services.FileUpLoad;
using Application.Common.Models;
using Application.Features.Auth.DTOs;
using Application.Features.Auth.Services.Command.UpdateProfile.Strategy;
using Application.Features.Auth.Services.Query.CurrentUser;

namespace Infrastructure.Auth.Services.Command.UpdateProfile.Strategy
{
    public class SelfUpdateProfileStrategy : IUpdateProfileStrategy
    {
        private readonly UserManager<ApplicationUser> _userManager;
        private readonly IFileUploadService _fileUploadService;

        public SelfUpdateProfileStrategy(UserManager<ApplicationUser> userManager
            , IFileUploadService fileUploadService)
        {
            _userManager = userManager;
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
        }
    }
}
