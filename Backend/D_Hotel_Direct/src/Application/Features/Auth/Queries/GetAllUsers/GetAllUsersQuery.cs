using Application.Features.Auth.DTOs;
using MediatR;

namespace Application.Features.Auth.Queries.GetAllUsers
{
    public record GetAllUsersQuery(string? Role) : IRequest<IEnumerable<UserProfileDto>>;
}
