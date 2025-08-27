using FluentValidation;

namespace Application.Features.Places.Queries.GetLocationById
{
    public class GetLocationByIdQueryValidator : AbstractValidator<GetLocationByIdQuery>
    {
        public GetLocationByIdQueryValidator()
        {
            RuleFor(x => x.id)
                .GreaterThan(0).WithMessage("LocationId must be greater than 0.");
        }
    }
}
