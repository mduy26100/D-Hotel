using FluentValidation;

namespace Application.Features.Auth.Queries.CurrentUser
{
    public class CurrentUserQueryValidator : AbstractValidator<CurrentUserQuery>
    {
        public CurrentUserQueryValidator()
        {
        }
    }
}
