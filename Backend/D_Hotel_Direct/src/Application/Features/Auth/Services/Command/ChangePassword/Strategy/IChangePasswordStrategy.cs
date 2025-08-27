using Application.Features.Auth.DTOs;
using Domain.Enums.Auth;

namespace Application.Features.Auth.Services.Command.ChangePassword.Strategy
{
    public interface IChangePasswordStrategy
    {
        ChangePasswordMethod Method { get; }

        Task ChangePasswordAsync(Guid userId, ChangePasswordDto dto, CancellationToken cancellationToken);
    }
}
