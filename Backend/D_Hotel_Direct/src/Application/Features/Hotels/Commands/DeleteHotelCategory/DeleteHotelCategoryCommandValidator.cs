using Application.Features.Hotels.Commands.DeleteHotelCategory;
using FluentValidation;

namespace Application.Features.Hotels.Validators
{
    public class DeleteHotelCategoryCommandValidator : AbstractValidator<DeleteHotelCategoryCommand>
    {
        public DeleteHotelCategoryCommandValidator()
        {
            RuleFor(x => x.Dto)
                .NotNull()
                .WithMessage("Hotel category data is required.");

            RuleFor(x => x.Dto.Id)
                .GreaterThan(0)
                .WithMessage("Hotel category ID must be greater than 0.");
        }
    }
}
