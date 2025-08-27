using Application.Features.Auth.DTOs;
using MediatR;

namespace Application.Features.Auth.Queries.CurrentUser
{
    public record CurrentUserQuery() : IRequest<UserProfileDto>;
}
