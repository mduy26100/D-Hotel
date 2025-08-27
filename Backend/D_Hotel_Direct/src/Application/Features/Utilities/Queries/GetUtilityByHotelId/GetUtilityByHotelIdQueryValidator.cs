using FluentValidation;

namespace Application.Features.Utilities.Queries.GetUtilityByHotelId
{
    public class GetUtilityByHotelIdQueryValidator : AbstractValidator<GetUtilityByHotelIdQuery>
    {
        public GetUtilityByHotelIdQueryValidator()
        {
            RuleFor(x => x.hotelId)
                .GreaterThan(0).WithMessage("HotelId must be greater than 0.");
        }
    }
}
