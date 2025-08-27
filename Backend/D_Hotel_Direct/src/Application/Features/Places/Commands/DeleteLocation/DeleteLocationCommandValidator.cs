using FluentValidation;

namespace Application.Features.Places.Commands.DeleteLocation
{
    public class DeleteLocationCommandValidator : AbstractValidator<DeleteLocationCommand>
    {
        public DeleteLocationCommandValidator()
        {
            RuleFor(x => x.dto)
                .NotNull().WithMessage("Location data is required.");

            RuleFor(x => x.dto.Id)
                .GreaterThan(0).WithMessage("Location Id must be greater than 0.");
        }
    }
}
