using Application.Features.Auth.DTOs;
using Application.Features.Auth.Services.Command.TokenRefresh;
using Application.Features.Auth.Services.Jwt;
using Infrastructure.Data;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;

public class TokenRefreshService : ITokenRefreshService
{
    private readonly ApplicationDbContext _dbContext;
    private readonly IJwtTokenGenerator _jwtTokenGenerator;

    public TokenRefreshService(ApplicationDbContext dbContext, IJwtTokenGenerator jwtTokenGenerator)
    {
        _dbContext = dbContext;
        _jwtTokenGenerator = jwtTokenGenerator;
    }

    public async Task<JwtTokenResponseDto> RefreshTokenAsync(string refreshToken, CancellationToken cancellationToken = default)
    {
        // 1. Tìm token
        var tokenEntity = await _dbContext.RefreshTokens
            .Include(t => t.User)
            .FirstOrDefaultAsync(t => t.Token == refreshToken, cancellationToken);

        if (tokenEntity == null || tokenEntity.IsRevoked || tokenEntity.ExpiresAt <= DateTime.UtcNow)
            throw new UnauthorizedAccessException("Refresh token is invalid or expired.");

        var user = tokenEntity.User;
        if (user == null)
            throw new UnauthorizedAccessException("User not found for this refresh token.");

        // 2. Thu hồi token cũ
        tokenEntity.IsRevoked = true;
        tokenEntity.RevokedAt = DateTime.UtcNow;

        // 3. Lấy claims từ user (giống login)
        var roles = await _dbContext.UserRoles
            .Where(ur => ur.UserId == user.Id)
            .Join(_dbContext.Roles,
                ur => ur.RoleId,
                r => r.Id,
                (ur, r) => r.Name ?? string.Empty)
            .ToListAsync(cancellationToken);

        var claims = new List<Claim>
        {
            new(ClaimTypes.NameIdentifier, user.Id.ToString()),
            new(ClaimTypes.Email, user.Email ?? string.Empty),
            new(ClaimTypes.Name, user.UserName ?? string.Empty),
            new(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString())
        };

        foreach (var role in roles)
        {
            claims.Add(new Claim(ClaimTypes.Role, role ?? string.Empty));
        }

        // 4. Sinh token mới
        var newAccessToken = _jwtTokenGenerator.GenerateToken(claims);
        var newRefreshToken = _jwtTokenGenerator.GenerateRefreshToken();
        var newRefreshTokenExpires = _jwtTokenGenerator.GetRefreshTokenExpiration();

        // 5. Lưu refresh token mới
        var newRefreshEntity = new RefreshToken
        {
            UserId = user.Id,
            Token = newRefreshToken,
            CreatedAt = DateTime.UtcNow,
            ExpiresAt = newRefreshTokenExpires,
            IsRevoked = false
        };

        _dbContext.RefreshTokens.Add(newRefreshEntity);
        await _dbContext.SaveChangesAsync(cancellationToken);

        return new JwtTokenResponseDto
        {
            AccessToken = newAccessToken,
            RefreshToken = newRefreshToken
        };
    }
}