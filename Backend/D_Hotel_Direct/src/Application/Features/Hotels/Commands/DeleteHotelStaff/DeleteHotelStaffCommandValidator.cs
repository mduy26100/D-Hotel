using FluentValidation;

namespace Application.Features.Hotels.Commands.DeleteHotelStaff
{
    public class DeleteHotelStaffCommandValidator : AbstractValidator<DeleteHotelStaffCommand>
    {
        public DeleteHotelStaffCommandValidator()
        {
            RuleFor(x => x.hotelStaffDto)
                .NotNull().WithMessage("HotelStaff information is required.");

            RuleFor(x => x.hotelStaffDto.Id)
                .GreaterThan(0).WithMessage("Id must be greater than 0.");
        }
    }
}
