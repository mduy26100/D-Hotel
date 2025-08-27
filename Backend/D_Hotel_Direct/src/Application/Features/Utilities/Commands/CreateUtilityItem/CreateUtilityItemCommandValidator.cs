using FluentValidation;

namespace Application.Features.Utilities.Commands.CreateUtilityItem
{
    public class CreateUtilityItemCommandValidator : AbstractValidator<CreateUtilityItemCommand>
    {
        public CreateUtilityItemCommandValidator()
        {
            RuleFor(x => x.Dto.UtilityId)
                .GreaterThan(0).WithMessage("UtilityId must be greater than 0.");

            RuleFor(x => x.Dto.Name)
                .NotEmpty().WithMessage("Name is required.")
                .MaximumLength(100).WithMessage("Name cannot exceed 100 characters.");

            RuleFor(x => x.Dto.Id)
                .Equal(0).WithMessage("Id should not be set when creating a new UtilityItem.");
        }
    }
}
