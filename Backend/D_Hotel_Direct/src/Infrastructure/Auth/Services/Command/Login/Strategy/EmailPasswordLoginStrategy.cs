﻿using Application.Features.Auth.DTOs;
using Application.Features.Auth.Services.Jwt;
using Domain.Enums.Auth;
using Infrastructure.Data;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;

namespace Application.Features.Auth.Services.Command.Login.Strategy
{
    public class EmailPasswordLoginStrategy : ILoginStrategy
    {
        public LoginProvider Provider => LoginProvider.EmailPassword;

        private readonly UserManager<ApplicationUser> _userManager;
        private readonly IJwtTokenGenerator _jwtTokenGenerator;
        private readonly ApplicationDbContext _dbContext;

        public EmailPasswordLoginStrategy(
            UserManager<ApplicationUser> userManager,
            IJwtTokenGenerator jwtTokenGenerator,
            ApplicationDbContext dbContext)
        {
            _userManager = userManager;
            _jwtTokenGenerator = jwtTokenGenerator;
            _dbContext = dbContext;
        }

        public async Task<JwtTokenResponseDto> LoginAsync(LoginRequestDto dto, CancellationToken cancellationToken)
        {
            var user = await _userManager.FindByEmailAsync(dto.Email);
            if (user == null || !await _userManager.CheckPasswordAsync(user, dto.Password))
            {
                throw new UnauthorizedAccessException("Invalid email or password.");
            }

            var roles = await _userManager.GetRolesAsync(user);
            var userClaims = await _userManager.GetClaimsAsync(user);

            var claims = new List<Claim>
            {
                new(ClaimTypes.NameIdentifier, user.Id.ToString()),
                new(ClaimTypes.Email, user.Email ?? string.Empty),
                new(ClaimTypes.Name, user.UserName ?? string.Empty),
                new(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString())
            };
            claims.AddRange(userClaims);
            claims.AddRange(roles.Select(role => new Claim(ClaimTypes.Role, role)));

            var accessToken = _jwtTokenGenerator.GenerateToken(claims);
            var refreshToken = _jwtTokenGenerator.GenerateRefreshToken();
            var refreshTokenExpires = _jwtTokenGenerator.GetRefreshTokenExpiration();

            _dbContext.RefreshTokens.Add(new RefreshToken
            {
                UserId = user.Id,
                Token = refreshToken,
                CreatedAt = DateTime.UtcNow,
                ExpiresAt = refreshTokenExpires,
                IsRevoked = false
            });
            await _dbContext.SaveChangesAsync(cancellationToken);

            return new JwtTokenResponseDto
            {
                AccessToken = accessToken,
                RefreshToken = refreshToken
            };
        }
    }
}
