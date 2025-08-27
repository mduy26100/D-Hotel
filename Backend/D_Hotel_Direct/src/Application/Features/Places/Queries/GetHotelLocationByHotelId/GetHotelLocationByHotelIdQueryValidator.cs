using FluentValidation;

namespace Application.Features.Places.Queries.GetHotelLocationByHotelId
{
    public class GetHotelLocationByHotelIdQueryValidator : AbstractValidator<GetHotelLocationByHotelIdQuery>
    {
        public GetHotelLocationByHotelIdQueryValidator()
        {
            RuleFor(x => x.hotelId)
                .GreaterThan(0).WithMessage("HotelId must be greater than 0.");
        }
    }
}
