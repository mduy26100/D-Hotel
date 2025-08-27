using FluentValidation;

namespace Application.Features.Utilities.Queries.GetUtilityById
{
    public class GetUtilityByIdQueryValidator : AbstractValidator<GetUtilityByIdQuery>
    {
        public GetUtilityByIdQueryValidator()
        {
            RuleFor(x => x.Id)
                .GreaterThan(0).WithMessage("UtilityId must be greater than 0.");
        }
    }
}
