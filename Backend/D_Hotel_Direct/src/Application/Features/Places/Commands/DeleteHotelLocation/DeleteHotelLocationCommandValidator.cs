using FluentValidation;

namespace Application.Features.Places.Commands.DeleteHotelLocation
{
    public class DeleteHotelLocationCommandValidator : AbstractValidator<DeleteHotelLocationCommand>
    {
        public DeleteHotelLocationCommandValidator()
        {
            RuleFor(x => x.dto)
                .NotNull().WithMessage("HotelLocation data is required.");

            RuleFor(x => x.dto.HotelId)
                .GreaterThan(0).WithMessage("HotelId must be greater than 0.");

            RuleFor(x => x.dto.LocationId)
                .GreaterThan(0).WithMessage("LocationId must be greater than 0.");
        }
    }
}
