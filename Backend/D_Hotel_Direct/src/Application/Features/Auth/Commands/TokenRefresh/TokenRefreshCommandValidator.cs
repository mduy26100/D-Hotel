using FluentValidation;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Application.Features.Auth.Commands.TokenRefresh
{
    public class TokenRefreshCommandValidator : AbstractValidator<TokenRefreshCommand>
    {
        public TokenRefreshCommandValidator()
        {
            RuleFor(x => x.RefreshToken)
                .NotEmpty().WithMessage("Refresh token is required.");
        }
    }
}
