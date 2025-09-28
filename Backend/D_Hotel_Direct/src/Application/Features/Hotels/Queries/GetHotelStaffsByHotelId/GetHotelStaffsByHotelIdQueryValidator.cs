using FluentValidation;

namespace Application.Features.Hotels.Queries.GetHotelStaffsByHotelId
{
    public class GetHotelStaffsByHotelIdQueryValidator : AbstractValidator<GetHotelStaffsByHotelIdQuery>
    {
        public GetHotelStaffsByHotelIdQueryValidator()
        {
            RuleFor(x => x.hotelId)
                .GreaterThan(0).WithMessage("HotelId must be greater than 0.");
        }
    }
}
