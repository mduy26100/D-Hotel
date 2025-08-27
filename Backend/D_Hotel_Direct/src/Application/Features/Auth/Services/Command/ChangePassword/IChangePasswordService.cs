using Application.Features.Auth.DTOs;

namespace Application.Features.Auth.Services.Command.ChangePassword
{
    public interface IChangePasswordService
    {
        Task ChangePasswordAsync(Guid userId, ChangePasswordDto dto, CancellationToken cancellationToken = default);
    }
}
