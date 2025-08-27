using FluentValidation;

namespace Application.Features.Hotels.Commands.CreateHotelCategory
{
    public class CreateHotelCategoryCommandValidator : AbstractValidator<CreateHotelCategoryCommand>
    {
        public CreateHotelCategoryCommandValidator()
        {
            RuleFor(x => x.Dto).NotNull().WithMessage("Hotel category data is required.");

            RuleFor(x => x.Dto.Name)
                .NotEmpty().WithMessage("Category name is required.")
                .MaximumLength(200).WithMessage("Category name must not exceed 200 characters.");
        }
    }
}
