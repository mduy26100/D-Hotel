using FluentValidation;

namespace Application.Features.Utilities.Commands.DeleteHotelUtility
{
    public class DeleteHotelUtilityCommandValidator : AbstractValidator<DeleteHotelUtilityCommand>
    {
        public DeleteHotelUtilityCommandValidator()
        {
            RuleFor(x => x.hotelId)
                .GreaterThan(0).WithMessage("HotelId must be greater than 0.");

            RuleFor(x => x.utilityIds)
                .NotEmpty().WithMessage("UtilityIds cannot be empty.")
                .Must(BeValidIds).WithMessage("UtilityIds must be a comma-separated list of integers.");
        }

        private bool BeValidIds(string utilityIds)
        {
            var ids = utilityIds.Split(',', StringSplitOptions.RemoveEmptyEntries);
            return ids.All(id => int.TryParse(id, out var parsed) && parsed > 0);
        }
    }
}
