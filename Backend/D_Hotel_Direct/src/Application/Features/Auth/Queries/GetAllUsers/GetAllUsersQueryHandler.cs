using Application.Common.Interfaces.Logging;
using Application.Features.Auth.DTOs;
using Application.Features.Auth.Services.Query.GetAllUsers;
using MediatR;

namespace Application.Features.Auth.Queries.GetAllUsers
{
    public class GetAllUsersQueryHandler : IRequestHandler<GetAllUsersQuery, IEnumerable<UserProfileDto>>
    {
        private readonly IGetAllUsersService _getAllUsersService;
        private readonly ILoggingService<GetAllUsersQueryHandler> _logger;

        public GetAllUsersQueryHandler(
            IGetAllUsersService getAllUsersService,
            ILoggingService<GetAllUsersQueryHandler> logger)
        {
            _getAllUsersService = getAllUsersService;
            _logger = logger;
        }

        public async Task<IEnumerable<UserProfileDto>> Handle(GetAllUsersQuery request, CancellationToken cancellationToken)
        {
            _logger.LogInformation("[GetAllUsers] Fetching all users");

            try
            {
                var users = await _getAllUsersService.GetAllUsersAsync(request.Role ,cancellationToken);
                _logger.LogInformation($"[GetAllUsers] Retrieved {users.Count()} users");
                return users;
            }
            catch (Exception ex)
            {
                _logger.LogError("[GetAllUsers] Failed to retrieve users", ex);
                throw;
            }
        }
    }
}
