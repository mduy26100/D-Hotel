using FluentValidation;

namespace Application.Features.Utilities.Commands.UpdateHotelUtility
{
    public class UpdateHotelUtilityCommandValidator : AbstractValidator<UpdateHotelUtilityCommand>
    {
        public UpdateHotelUtilityCommandValidator()
        {
            RuleFor(x => x.hotelId)
                .GreaterThan(0).WithMessage("HotelId must be greater than 0.");

            RuleFor(x => x.utilityIds)
                .NotEmpty().WithMessage("UtilityIds is required.")
                .Matches(@"^(\d+)(,\d+)*$").WithMessage("UtilityIds must be a comma-separated list of numbers.");
        }
    }
}
