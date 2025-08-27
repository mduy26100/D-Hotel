using FluentValidation;

namespace Application.Features.Auth.Commands.Register
{
    public class RegisterCommandValidator : AbstractValidator<RegisterCommand>
    {
        public RegisterCommandValidator()
        {
            RuleFor(x => x.Dto.FirstName)
                .MaximumLength(50).WithMessage("First name must be at most 50 characters.");

            RuleFor(x => x.Dto.LastName)
                .MaximumLength(50).WithMessage("Last name must be at most 50 characters.");

            RuleFor(x => x.Dto.UserName)
                .NotEmpty().WithMessage("Username is required.")
                .MinimumLength(3).WithMessage("Username must be at least 3 characters.");

            RuleFor(x => x.Dto.Email)
                .NotEmpty().WithMessage("Email is required.")
                .EmailAddress().WithMessage("Invalid email format.");

            RuleFor(x => x.Dto.PhoneNumber)
                .NotEmpty().WithMessage("Phone number is required.");

            RuleFor(x => x.Dto.Password)
                .NotEmpty().WithMessage("Password is required.")
                .MinimumLength(6).WithMessage("Password must be at least 6 characters.");

            RuleFor(x => x.Dto.ConfirmPassword)
                .Equal(x => x.Dto.Password).WithMessage("Passwords do not match.");
        }
    }
}
