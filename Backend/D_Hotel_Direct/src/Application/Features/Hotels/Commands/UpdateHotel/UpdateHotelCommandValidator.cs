using FluentValidation;

namespace Application.Features.Hotels.Commands.UpdateHotel
{
    public class UpdateHotelCommandValidator : AbstractValidator<UpdateHotelCommand>
    {
        public UpdateHotelCommandValidator()
        {
            RuleFor(x => x.dto)
                .NotNull().WithMessage("Hotel data is required.");

            RuleFor(x => x.dto.Id)
                .GreaterThan(0).WithMessage("Hotel ID must be greater than 0.");

            RuleFor(x => x.dto.Name)
                .NotEmpty().WithMessage("Hotel name is required.")
                .MaximumLength(200).WithMessage("Hotel name cannot exceed 200 characters.");

            RuleFor(x => x.dto.CategoryId)
                .GreaterThan(0).WithMessage("CategoryId must be greater than 0.");

            RuleFor(x => x.dto.HotelManagerId)
                .NotEmpty().WithMessage("HotelManagerId is required.");

            RuleFor(x => x.dto.Address)
                .NotEmpty().WithMessage("Address is required.")
                .MaximumLength(500).WithMessage("Address cannot exceed 500 characters.");

            RuleFor(x => x.dto.Description)
                .NotEmpty().WithMessage("Description is required.");

            When(x => x.ImageContent != null, () =>
            {
                RuleFor(x => x.ImageFileName)
                    .NotEmpty().WithMessage("Image file name is required when image is uploaded.");

                RuleFor(x => x.ImageContentType)
                    .Must(ct => ct != null && (ct.Equals("image/jpeg") || ct.Equals("image/png")))
                    .WithMessage("Only JPEG or PNG images are allowed.");
            });
        }
    }
}
