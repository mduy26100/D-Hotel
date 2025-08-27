using FluentValidation;

namespace Application.Features.Places.Commands.UpdateLocation
{
    public class UpdateLocationCommandValidator : AbstractValidator<UpdateLocationCommand>
    {
        public UpdateLocationCommandValidator()
        {
            RuleFor(x => x.dto)
                .NotNull().WithMessage("Location data is required.");

            RuleFor(x => x.dto.Id)
                .GreaterThan(0).WithMessage("Location Id must be greater than 0.");

            RuleFor(x => x.dto.Name)
                .NotEmpty().WithMessage("Location name is required.")
                .MaximumLength(200).WithMessage("Location name must not exceed 200 characters.");

            When(x => x.ImageContent != null, () =>
            {
                RuleFor(x => x.ImageFileName)
                    .NotEmpty().WithMessage("Image file name is required when image content is provided.")
                    .Must(f => f!.EndsWith(".jpg", StringComparison.OrdinalIgnoreCase) ||
                               f.EndsWith(".jpeg", StringComparison.OrdinalIgnoreCase) ||
                               f.EndsWith(".png", StringComparison.OrdinalIgnoreCase) ||
                               f.EndsWith(".webp", StringComparison.OrdinalIgnoreCase))
                    .WithMessage("Image file must be a valid format (.jpg, .jpeg, .png, .webp).");

                RuleFor(x => x.ImageContentType)
                    .NotEmpty().WithMessage("Image content type is required when image content is provided.")
                    .Must(ct => ct == "image/jpeg" || ct == "image/png" || ct == "image/webp")
                    .WithMessage("Image content type must be image/jpeg, image/png, or image/webp.");
            });
        }
    }
}
