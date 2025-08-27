using FluentValidation;

namespace Application.Features.Utilities.Commands.UpdateUtility
{
    public class UpdateUtilityCommandValidator : AbstractValidator<UpdateUtilityCommand>
    {
        public UpdateUtilityCommandValidator()
        {
            RuleFor(x => x.Dto)
                .NotNull().WithMessage("Utility data is required.");

            RuleFor(x => x.Dto.Id)
                .GreaterThan(0).WithMessage("Utility Id must be greater than 0.");

            RuleFor(x => x.Dto.Name)
                .NotEmpty().WithMessage("Utility name is required.")
                .MaximumLength(100).WithMessage("Utility name must not exceed 100 characters.");

            When(x => x.ImageContent != null || !string.IsNullOrWhiteSpace(x.ImageFileName) || !string.IsNullOrWhiteSpace(x.ImageContentType), () =>
            {
                RuleFor(x => x.ImageContent)
                    .NotNull().WithMessage("Image content must be provided when updating an image.");

                RuleFor(x => x.ImageFileName)
                    .NotEmpty().WithMessage("Image file name must be provided when updating an image.");

                RuleFor(x => x.ImageContentType)
                    .NotEmpty().WithMessage("Image content type must be provided when updating an image.");
            });
        }
    }
}
