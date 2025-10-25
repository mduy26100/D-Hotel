using Domain.Enums.Auth;

namespace Application.Features.Auth.DTOs
{
    public class LoginRequestDto
    {
        public required string Email { get; set; }
        public required string Password { get; set; }

        public LoginProvider Provider { get; set; } = LoginProvider.EmailPassword;

        // 🔹 Dùng cho Facebook (hoặc Google) login
        public string? AccessToken { get; set; }
    }
}
