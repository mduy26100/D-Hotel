using FluentValidation;

namespace Application.Features.Hotels.Commands.CreateHotelStaff
{
    public class CreateHotelStaffCommandValidator : AbstractValidator<CreateHotelStaffCommand>
    {
        public CreateHotelStaffCommandValidator()
        {
            RuleFor(x => x.hotelStaffDto)
                .NotNull().WithMessage("HotelStaff information is required.");

            RuleFor(x => x.hotelStaffDto.UserId)
                .NotEmpty().WithMessage("UserId is required.");

            RuleFor(x => x.hotelStaffDto.HotelId)
                .GreaterThan(0).WithMessage("HotelId must be greater than 0.");
        }
    }
}
