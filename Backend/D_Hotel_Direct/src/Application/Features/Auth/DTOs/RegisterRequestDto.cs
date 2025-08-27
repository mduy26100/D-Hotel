using Domain.Enums.Auth;

namespace Application.Features.Auth.DTOs
{
    public class RegisterRequestDto
    {
        public string? FirstName { get; set; }
        public string? LastName { get; set; }
        public required string UserName { get; set; }
        public required string Email { get; set; }
        public required string PhoneNumber { get; set; }
        public required string Password { get; set; }
        public required string ConfirmPassword { get; set; }
        public string? Role { get; set; }
        public RegisterProvider Provider { get; set; } = RegisterProvider.EmailPassword;
    }
}
