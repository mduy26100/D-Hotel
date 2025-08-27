using FluentValidation;

namespace Application.Features.Hotels.Queries.GetHotelsByCategoryId
{
    public class GetHotelsByCategoryIdQueryValidator : AbstractValidator<GetHotelsByCategoryIdQuery>
    {
        public GetHotelsByCategoryIdQueryValidator()
        {
            RuleFor(x => x.CategoryId)
                .GreaterThan(0).WithMessage("HotelCategoryId must be greater than 0.");
        }
    }
}
