using Application.Features.Auth.Configurations;
using Application.Features.Auth.DTOs;
using Application.Features.Auth.Services.Jwt;
using Domain.Enums.Auth;
using Infrastructure.Data;
using Microsoft.Extensions.Options;
using Newtonsoft.Json.Linq;
using System.Security.Claims;

namespace Application.Features.Auth.Services.Command.Login.Strategy
{
    public class FacebookLoginStrategy : ILoginStrategy
    {
        public LoginProvider Provider => LoginProvider.Facebook;

        private readonly UserManager<ApplicationUser> _userManager;
        private readonly IJwtTokenGenerator _jwtTokenGenerator;
        private readonly ApplicationDbContext _dbContext;
        private readonly HttpClient _httpClient;
        private readonly FacebookAuthSettings _fbSettings;

        public FacebookLoginStrategy(
            UserManager<ApplicationUser> userManager,
            IJwtTokenGenerator jwtTokenGenerator,
            ApplicationDbContext dbContext,
            IHttpClientFactory httpClientFactory,
            IOptions<FacebookAuthSettings> fbOptions)
        {
            _userManager = userManager;
            _jwtTokenGenerator = jwtTokenGenerator;
            _dbContext = dbContext;
            _httpClient = httpClientFactory.CreateClient();
            _fbSettings = fbOptions.Value;
        }

        public async Task<JwtTokenResponseDto> LoginAsync(LoginRequestDto dto, CancellationToken cancellationToken)
        {
            if (string.IsNullOrEmpty(dto.AccessToken))
                throw new UnauthorizedAccessException("Access token is required.");

            // ✅ Step 1: Verify token with Facebook Graph API
            var appAccessToken = $"{_fbSettings.AppId}|{_fbSettings.AppSecret}";
            var verifyUrl =
                $"https://graph.facebook.com/debug_token?input_token={dto.AccessToken}&access_token={Uri.EscapeDataString(appAccessToken)}";

            var verifyResponse = await _httpClient.GetAsync(verifyUrl, cancellationToken);

            if (!verifyResponse.IsSuccessStatusCode)
                throw new UnauthorizedAccessException("Invalid Facebook token.");

            var verifyContent = await verifyResponse.Content.ReadAsStringAsync();
            var verifyData = JObject.Parse(verifyContent);

            bool isValid = verifyData["data"]?["is_valid"]?.ToObject<bool>() ?? false;
            if (!isValid)
                throw new UnauthorizedAccessException("Invalid or expired Facebook token.");

            // ✅ Step 2: Get Facebook user profile
            var requestUrl =
                $"https://graph.facebook.com/me?fields=id,first_name,last_name,email,picture&access_token={dto.AccessToken}";
            var response = await _httpClient.GetAsync(requestUrl, cancellationToken);
            var content = await response.Content.ReadAsStringAsync();

            var fbUser = JObject.Parse(content);
            var email = fbUser["email"]?.ToString();
            var firstName = fbUser["first_name"]?.ToString();
            var lastName = fbUser["last_name"]?.ToString();
            var facebookId = fbUser["id"]?.ToString();
            var avatarUrl = fbUser["picture"]?["data"]?["url"]?.ToString();

            if (string.IsNullOrEmpty(email))
                email = $"{facebookId}@facebook.com";

            // ✅ Step 3: Check or create user
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

            // ✅ Step 4: Generate JWT
            var claims = new List<Claim>
            {
                new(ClaimTypes.NameIdentifier, user.Id.ToString()),
                new(ClaimTypes.Email, user.Email ?? string.Empty),
                new(ClaimTypes.Name, $"{user.FirstName} {user.LastName}".Trim())
            };

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
