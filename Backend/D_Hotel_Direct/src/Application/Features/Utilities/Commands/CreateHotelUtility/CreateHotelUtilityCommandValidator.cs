using FluentValidation;

namespace Application.Features.Utilities.Commands.CreateHotelUtility
{
    public class CreateHotelUtilityCommandValidator : AbstractValidator<CreateHotelUtilityCommand>
    {
        public CreateHotelUtilityCommandValidator()
        {
            RuleFor(x => x.hotelId)
                .GreaterThan(0).WithMessage("HotelId must be greater than 0.");

            RuleFor(x => x.utilityId)
                .NotEmpty().WithMessage("UtilityId is required.")
                .MaximumLength(100).WithMessage("UtilityId cannot exceed 100 characters.");
        }
    }
}
