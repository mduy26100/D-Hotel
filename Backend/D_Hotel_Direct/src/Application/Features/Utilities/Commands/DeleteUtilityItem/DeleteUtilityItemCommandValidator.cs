using FluentValidation;

namespace Application.Features.Utilities.Commands.DeleteUtilityItem
{
    public class DeleteUtilityItemCommandValidator : AbstractValidator<DeleteUtilityItemCommand>
    {
        public DeleteUtilityItemCommandValidator()
        {
            RuleFor(x => x.Dto)
                .NotNull().WithMessage("UtilityItem data is required.");

            RuleFor(x => x.Dto.Id)
                .GreaterThan(0).WithMessage("UtilityItem Id must be greater than 0.");

            RuleFor(x => x.Dto.UtilityId)
                .GreaterThan(0).WithMessage("Utility Id must be greater than 0.");
        }
    }
}
