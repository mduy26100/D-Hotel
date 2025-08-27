using FluentValidation;

namespace Application.Features.Hotels.Queries.GetHotelCategoryById
{
    public class GetHotelCategoryByIdQueryValidator : AbstractValidator<GetHotelCategoryByIdQuery>
    {
        public GetHotelCategoryByIdQueryValidator()
        {
            RuleFor(x => x.Id)
                .GreaterThan(0).WithMessage("HotelCategoryId must be greater than 0.");
        }
    }
}
