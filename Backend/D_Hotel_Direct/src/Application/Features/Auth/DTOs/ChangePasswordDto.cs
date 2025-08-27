using Domain.Enums.Auth;

namespace Application.Features.Auth.DTOs
{
    public class ChangePasswordDto
    {
        public string CurrentPassword { get; set; } = null!;
        public string NewPassword { get; set; } = null!;
        public string ConfirmNewPassword { get; set; } = null!;
        public ChangePasswordMethod Method { get; set; }
    }
}
