using FluentValidation;

namespace Application.Features.Utilities.Commands.UpdateUtilityItem
{
    public class UpdateUtilityItemCommandValidator : AbstractValidator<UpdateUtilityItemCommand>
    {
        public UpdateUtilityItemCommandValidator()
        {
            RuleFor(x => x.Dto)
                .NotNull().WithMessage("Utility item data is required.");

            RuleFor(x => x.Dto.Id)
                .GreaterThan(0).WithMessage("Utility item Id must be greater than 0.");

            RuleFor(x => x.Dto.UtilityId)
                .GreaterThan(0).WithMessage("Utility Id must be greater than 0.");

            RuleFor(x => x.Dto.Name)
                .NotEmpty().WithMessage("Utility item name is required.")
                .MaximumLength(100).WithMessage("Utility item name must not exceed 100 characters.");
        }
    }
}
