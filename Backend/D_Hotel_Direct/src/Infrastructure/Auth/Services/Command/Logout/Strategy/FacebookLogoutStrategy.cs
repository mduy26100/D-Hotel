using Application.Features.Auth.Services.Command.Logout.Strategy;
using Domain.Enums.Auth;

namespace Infrastructure.Auth.Services.Command.Logout.Strategy
{
    public class FacebookLogoutStrategy : ILogoutStrategy
    {
        public LoginProvider Provider => LoginProvider.Facebook;

        public Task LogoutAsync(Guid userId, CancellationToken cancellationToken = default)
        {
            throw new NotImplementedException();
        }
    }
}
