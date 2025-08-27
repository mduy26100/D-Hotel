using FluentValidation;

namespace Application.Features.Utilities.Commands.CreateUtility
{
    public class CreateUtilityCommandValidator : AbstractValidator<CreateUtilityCommand>
    {
        public CreateUtilityCommandValidator()
        {
            RuleFor(x => x.Name)
                .NotEmpty().WithMessage("Utility name is required.")
                .MaximumLength(100).WithMessage("Utility name cannot exceed 100 characters.");

            When(x => x.ImageContent != null, () =>
            {
                RuleFor(x => x.ImageFileName)
                    .NotEmpty().WithMessage("Image file name is required when uploading an image.")
                    .Matches(@"\.(jpg|jpeg|png|webp)$")
                    .WithMessage("Image file must have a valid extension (.jpg, .jpeg, .png, .webp).");

                RuleFor(x => x.ImageContentType)
                    .NotEmpty().WithMessage("Image content type is required when uploading an image.")
                    .Must(ct => ct == "image/jpeg" || ct == "image/png" || ct == "image/webp")
                    .WithMessage("Only JPEG, PNG or WebP images are allowed.");
            });
        }
    }
}
