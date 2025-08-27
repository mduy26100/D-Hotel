using Application.Features.Auth.DTOs;
using MediatR;

namespace Application.Features.Auth.Queries.GetAllUsers
{
    public record GetAllUsersQuery : IRequest<IEnumerable<UserProfileDto>>;
}
