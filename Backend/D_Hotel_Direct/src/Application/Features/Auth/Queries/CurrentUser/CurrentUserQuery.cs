using Application.Features.Auth.DTOs;
using MediatR;

namespace Application.Features.Auth.Queries.CurrentUser
{
    public record CurrentUserQuery(Guid? UserId = null) : IRequest<UserProfileDto>;
}
