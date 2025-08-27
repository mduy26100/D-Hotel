using Application.Features.Hotels.Commands.DeleteHotel;
using FluentValidation;

namespace Application.Features.Hotels.Validators
{
    public class DeleteHotelCommandValidator : AbstractValidator<DeleteHotelCommand>
    {
        public DeleteHotelCommandValidator()
        {
            RuleFor(x => x.Dto)
                .NotNull()
                .WithMessage("Hotel data is required.");

            RuleFor(x => x.Dto.Id)
                .GreaterThan(0)
                .WithMessage("Hotel ID must be greater than 0.");
        }
    }
}
