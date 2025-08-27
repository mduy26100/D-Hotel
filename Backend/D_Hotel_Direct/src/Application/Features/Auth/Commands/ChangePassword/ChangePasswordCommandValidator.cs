using FluentValidation;

namespace Application.Features.Auth.Commands.ChangePassword
{
    public class ChangePasswordCommandValidator : AbstractValidator<ChangePasswordCommand>
    {
        public ChangePasswordCommandValidator()
        {
            RuleFor(x => x.Dto.CurrentPassword)
                .NotEmpty().WithMessage("Old password is required.")
                .MinimumLength(6).WithMessage("Old password must be at least 6 characters.");

            RuleFor(x => x.Dto.NewPassword)
                .NotEmpty().WithMessage("New password is required.")
                .MinimumLength(6).WithMessage("New password must be at least 6 characters.");

            RuleFor(x => x.Dto.ConfirmNewPassword)
                .Equal(x => x.Dto.NewPassword).WithMessage("Passwords do not match.");
        }
    }
}
