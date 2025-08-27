using FluentValidation;

namespace Application.Features.Utilities.Commands.DeleteUtility
{
    public class DeleteUtilityCommandValidator : AbstractValidator<DeleteUtilityCommand>
    {
        public DeleteUtilityCommandValidator()
        {
            RuleFor(x => x.Dto)
                .NotNull().WithMessage("Utility data is required.");

            RuleFor(x => x.Dto.Id)
                .GreaterThan(0).WithMessage("Utility Id must be greater than 0.");
        }
    }
}
