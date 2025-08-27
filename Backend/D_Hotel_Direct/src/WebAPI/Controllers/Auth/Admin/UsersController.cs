using Application.Features.Auth.Queries.GetAllUsers;
using Domain.Consts;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace WebAPI.Controllers.Auth.Admin
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize(Roles = Roles.Manager)]
    public class UsersController : ControllerBase
    {
        private readonly IMediator _mediator;

        public UsersController(IMediator mediator)
        {
            _mediator = mediator;
        }

        [HttpGet("all-users")]
        public async Task<IActionResult> GetAllUsers(CancellationToken cancellationToken)
        {
            var query = new GetAllUsersQuery();
            var allUsers = await _mediator.Send(query, cancellationToken);

            if (allUsers == null || !allUsers.Any())
            {
                return NotFound("No users found.");
            }

            return Ok(allUsers);
        }
    }
}
