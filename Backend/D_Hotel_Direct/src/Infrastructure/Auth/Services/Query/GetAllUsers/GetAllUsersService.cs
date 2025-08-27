using Application.Features.Auth.DTOs;
using Application.Features.Auth.Services.Query.GetAllUsers;

namespace Infrastructure.Auth.Services.Query.GetAllUsers
{
    public class GetAllUsersService : IGetAllUsersService
    {
        private readonly UserManager<ApplicationUser> _userManager;

        public GetAllUsersService(UserManager<ApplicationUser> userManager)
        {
            _userManager = userManager;
        }

        public async Task<IEnumerable<UserProfileDto>> GetAllUsersAsync(CancellationToken cancellationToken = default)
        {
            var users = await _userManager.Users.ToListAsync(cancellationToken);

            var result = new List<UserProfileDto>();

            foreach (var user in users)
            {
                var roles = await _userManager.GetRolesAsync(user);

                if(roles.Contains(Roles.Manager, StringComparer.OrdinalIgnoreCase))
                {
                    continue;
                }

                result.Add(new UserProfileDto
                {
                    Id = user.Id,
                    UserName = user.UserName,
                    Email = user.Email,
                    FirstName = user.FirstName,
                    LastName = user.LastName,
                    AvatarUrl = user.AvatarUrl,
                    Roles = roles.ToList()
                });
            }

            return result;
        }
    }
}