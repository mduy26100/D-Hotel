using FluentValidation;

namespace Application.Features.Auth.Commands.Logout
{
    public class LogoutCommandValidator : AbstractValidator<LogoutCommand>
    {
        public LogoutCommandValidator()
        {
            RuleFor(x => x.Provider)
                .IsInEnum().WithMessage("Provider is invalid.");
        }
    }
}
