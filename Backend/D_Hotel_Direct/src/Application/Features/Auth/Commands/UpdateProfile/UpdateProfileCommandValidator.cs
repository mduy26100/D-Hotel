using FluentValidation;

namespace Application.Features.Auth.Commands.UpdateProfile
{
    public class UpdateProfileCommandValidator : AbstractValidator<UpdateProfileCommand>
    {
        public UpdateProfileCommandValidator()
        {

            RuleFor(x => x.Dto.FirstName)
                .MaximumLength(50).WithMessage("First name must be at most 50 characters.");

            RuleFor(x => x.Dto.LastName)
                .MaximumLength(50).WithMessage("Last name must be at most 50 characters.");

            RuleFor(x => x.Dto.PhoneNumber)
                .MaximumLength(20).WithMessage("Phone number must be at most 20 characters.");

            RuleFor(x => x.Dto.AvatarUrl)
                .MaximumLength(200).WithMessage("Avatar URL must be at most 200 characters.");

            RuleFor(x => x.Dto.Role)
                .MaximumLength(50).WithMessage("Role must be at most 50 characters.");
        }
    }
}
