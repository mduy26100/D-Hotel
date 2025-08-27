using FluentValidation;

namespace Application.Features.Places.Queries.GetHotelLocationByLocationId
{
    public class GetHotelLocationByLocationIdQueryValidator : AbstractValidator<GetHotelLocationByLocationIdQuery>
    {
        public GetHotelLocationByLocationIdQueryValidator()
        {
            RuleFor(x => x.locationId)
                .GreaterThan(0).WithMessage("LocationId must be greater than 0.");
        }
    }
}
