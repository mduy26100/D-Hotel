using FluentValidation;

namespace Application.Features.Hotels.Queries.GetHotelById
{
    public class GetHotelByIdQueryValidator : AbstractValidator<GetHotelByIdQuery>
    {
        public GetHotelByIdQueryValidator()
        {
            RuleFor(x => x.Id)
                .GreaterThan(0).WithMessage("HotelId must be greater than 0.");
        }
    }
}
