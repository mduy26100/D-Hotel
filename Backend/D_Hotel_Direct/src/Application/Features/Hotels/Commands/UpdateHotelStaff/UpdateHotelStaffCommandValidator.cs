using FluentValidation;

namespace Application.Features.Hotels.Commands.UpdateHotelStaff
{
    public class UpdateHotelStaffCommandValidator : AbstractValidator<UpdateHotelStaffCommand>
    {
        public UpdateHotelStaffCommandValidator()
        {
            RuleFor(x => x.hotelStaffDto)
                .NotNull().WithMessage("HotelStaff information is required.");

            RuleFor(x => x.hotelStaffDto.Id)
                .GreaterThan(0).WithMessage("Id must be greater than 0.");

            RuleFor(x => x.hotelStaffDto.UserId)
                .NotEmpty().WithMessage("UserId is required.");

            RuleFor(x => x.hotelStaffDto.HotelId)
                .GreaterThan(0).WithMessage("HotelId must be greater than 0.");
        }
    }
}
