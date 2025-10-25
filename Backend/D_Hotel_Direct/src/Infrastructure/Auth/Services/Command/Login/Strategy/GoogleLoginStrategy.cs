using Application.Features.Auth.Configurations;
using Application.Features.Auth.DTOs;
using Application.Features.Auth.Services.Jwt;
using Domain.Enums.Auth;
using Infrastructure.Data;
using Microsoft.Extensions.Options;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;

namespace Application.Features.Auth.Services.Command.Login.Strategy
{
    public class GoogleLoginStrategy : ILoginStrategy
    {
        public LoginProvider Provider => LoginProvider.Google;

        private readonly UserManager<ApplicationUser> _userManager;
        private readonly IJwtTokenGenerator _jwtTokenGenerator;
        private readonly ApplicationDbContext _dbContext;
        private readonly GoogleAuthSettings _googleSettings;

        public GoogleLoginStrategy(
            UserManager<ApplicationUser> userManager,
            IJwtTokenGenerator jwtTokenGenerator,
            ApplicationDbContext dbContext,
            IOptions<GoogleAuthSettings> googleOptions)
        {
            _userManager = userManager;
            _jwtTokenGenerator = jwtTokenGenerator;
            _dbContext = dbContext;
            _googleSettings = googleOptions.Value;
        }

        public async Task<JwtTokenResponseDto> LoginAsync(LoginRequestDto dto, CancellationToken cancellationToken)
        {
            if (string.IsNullOrEmpty(dto.AccessToken))
                throw new UnauthorizedAccessException("Access token is required.");

            // ✅ Verify Google id_token (JWT)
            var handler = new JwtSecurityTokenHandler();
            var jwtToken = handler.ReadJwtToken(dto.AccessToken);

            var aud = jwtToken.Audiences.FirstOrDefault();
            if (aud != _googleSettings.ClientId)
                throw new UnauthorizedAccessException("Invalid Google token.");

            var email = jwtToken.Payload["email"]?.ToString()
                        ?? throw new UnauthorizedAccessException("Email not found.");
            jwtToken.Payload.TryGetValue("given_name", out var givenNameObj);
            jwtToken.Payload.TryGetValue("family_name", out var familyNameObj);
            jwtToken.Payload.TryGetValue("picture", out var pictureObj);

            var firstName = givenNameObj?.ToString() ?? "";
            var lastName = familyNameObj?.ToString() ?? "";
            var avatarUrl = pictureObj?.ToString() ?? "";

            // ✅ Step 2: Check or create user
            var user = await _userManager.FindByEmailAsync(email);
            if (user == null)
            {
                user = new ApplicationUser
                {
                    UserName = email,
                    Email = email,
                    FirstName = firstName,
                    LastName = lastName,
                    AvatarUrl = avatarUrl,
                    EmailConfirmed = true,
                    CreatedAt = DateTime.UtcNow
                };

                var createResult = await _userManager.CreateAsync(user);
                if (!createResult.Succeeded)
                    throw new Exception("Failed to create user.");
            }

            // ✅ Step 3: Generate JWT
            var claims = new List<Claim>
            {
                new(ClaimTypes.NameIdentifier, user.Id.ToString()),
                new(ClaimTypes.Email, user.Email ?? string.Empty),
                new(ClaimTypes.Name, $"{user.FirstName} {user.LastName}".Trim())
            };

            var accessToken = _jwtTokenGenerator.GenerateToken(claims);
            var refreshToken = _jwtTokenGenerator.GenerateRefreshToken();
            var refreshTokenExpires = _jwtTokenGenerator.GetRefreshTokenExpiration();

            // ✅ Step 4: Save refresh token
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