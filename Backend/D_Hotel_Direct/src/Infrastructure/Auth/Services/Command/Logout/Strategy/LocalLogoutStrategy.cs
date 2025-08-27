using Application.Features.Auth.Services.Command.Logout.Strategy;
using Domain.Enums.Auth;
using Infrastructure.Data;

namespace Infrastructure.Auth.Services.Command.Logout.Strategy
{
    public class LocalLogoutStrategy : ILogoutStrategy
    {
        public LoginProvider Provider => LoginProvider.EmailPassword;

        private readonly ApplicationDbContext _dbContext;

        public LocalLogoutStrategy(ApplicationDbContext dbContext)
        {
            _dbContext = dbContext;
        }

        public async Task LogoutAsync(Guid userId, CancellationToken cancellationToken = default)
        {
            var tokens = await _dbContext.RefreshTokens
                .Where(t => t.UserId == userId && !t.IsRevoked && t.ExpiresAt > DateTime.UtcNow)
                .ToListAsync(cancellationToken);

            foreach (var token in tokens)
            {
                token.IsRevoked = true;
                token.RevokedAt = DateTime.UtcNow;
            }

            await _dbContext.SaveChangesAsync(cancellationToken);
        }
    }
}
