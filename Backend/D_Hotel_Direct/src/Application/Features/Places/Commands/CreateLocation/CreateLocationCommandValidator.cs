using FluentValidation;

namespace Application.Features.Places.Commands.CreateLocation
{
    public class CreateLocationCommandValidator : AbstractValidator<CreateLocationCommand>
    {
        public CreateLocationCommandValidator()
        {
            RuleFor(x => x.name)
                .NotEmpty().WithMessage("Location name is required.")
                .MaximumLength(200).WithMessage("Location name cannot exceed 200 characters.");

            When(x => x.ImageContent != null, () =>
            {
                RuleFor(x => x.ImageFileName)
                    .NotEmpty().WithMessage("Image file name is required when uploading an image.");

                RuleFor(x => x.ImageContentType)
                    .Must(ct => ct != null && (ct.Equals("image/jpeg") || ct.Equals("image/png")))
                    .WithMessage("Only JPEG or PNG images are allowed.");
            });
        }
    }
}
