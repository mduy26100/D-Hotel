using Domain.Enums.Auth;
using MediatR;

namespace Application.Features.Auth.Commands.Logout
{
    public record LogoutCommand(LoginProvider Provider) : IRequest;
}
