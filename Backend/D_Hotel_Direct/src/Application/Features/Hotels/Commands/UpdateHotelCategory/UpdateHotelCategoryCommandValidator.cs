using FluentValidation;

namespace Application.Features.Hotels.Commands.UpdateHotelCategory
{
    public class UpdateHotelCategoryCommandValidator : AbstractValidator<UpdateHotelCategoryCommand>
    {
        public UpdateHotelCategoryCommandValidator()
        {
            RuleFor(x => x.Dto)
                .NotNull().WithMessage("Hotel category data is required.");

            RuleFor(x => x.Dto.Id)
                .GreaterThan(0).WithMessage("Hotel category Id must be greater than 0.");

            RuleFor(x => x.Dto.Name)
                .NotEmpty().WithMessage("Hotel category name is required.")
                .MaximumLength(100).WithMessage("Hotel category name must not exceed 100 characters.");
        }
    }
}
