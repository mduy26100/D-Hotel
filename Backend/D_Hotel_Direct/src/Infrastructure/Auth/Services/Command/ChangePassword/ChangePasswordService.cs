using Application.Features.Auth.DTOs;
using Application.Features.Auth.Services.Command.ChangePassword;
using Application.Features.Auth.Services.Command.ChangePassword.Factory;

namespace Infrastructure.Auth.Services.Command.ChangePassword
{
    public class ChangePasswordService : IChangePasswordService
    {
        private readonly IChangePasswordStrategyFactory _factory;

        public ChangePasswordService(IChangePasswordStrategyFactory factory)
        {
            _factory = factory;
        }

        public Task ChangePasswordAsync(Guid userId, ChangePasswordDto dto, CancellationToken cancellationToken = default)
        {
            var strategy = _factory.GetStrategy(dto.Method);
            return strategy.ChangePasswordAsync(userId, dto, cancellationToken);
        }
    }
}
