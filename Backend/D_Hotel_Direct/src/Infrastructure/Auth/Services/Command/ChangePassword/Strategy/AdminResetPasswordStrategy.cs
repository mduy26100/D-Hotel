using Application.Features.Auth.DTOs;
using Application.Features.Auth.Services.Command.ChangePassword.Strategy;
using Domain.Enums.Auth;

namespace Infrastructure.Auth.Services.Command.ChangePassword.Strategy
{
    public class AdminResetPasswordStrategy : IChangePasswordStrategy
    {
        public ChangePasswordMethod Method => ChangePasswordMethod.Admin;

        public Task ChangePasswordAsync(Guid userId, ChangePasswordDto dto, CancellationToken cancellationToken)
        {
            throw new NotImplementedException();
        }
    }
}
