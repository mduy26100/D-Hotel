using FluentValidation;

namespace Application.Features.Utilities.Queries.GetUtilityItemsByUtilityId
{
    public class GetUtilityItemsByUtilityIdQueryValidator : AbstractValidator<GetUtilityItemsByUtilityIdQuery>
    {
        public GetUtilityItemsByUtilityIdQueryValidator()
        {
            RuleFor(x => x.utilityId)
                .GreaterThan(0).WithMessage("UtilityId must be greater than 0.");
        }
    }
}
