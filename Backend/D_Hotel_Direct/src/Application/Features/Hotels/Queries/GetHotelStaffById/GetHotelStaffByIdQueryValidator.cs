using FluentValidation;

namespace Application.Features.Hotels.Queries.GetHotelStaffById
{
    public class GetHotelStaffByIdQueryValidator : AbstractValidator<GetHotelStaffByIdQuery>
    {
        public GetHotelStaffByIdQueryValidator()
        {
            RuleFor(x => x.id)
                .GreaterThan(0).WithMessage("Id must be greater than 0.");
        }
    }
}
