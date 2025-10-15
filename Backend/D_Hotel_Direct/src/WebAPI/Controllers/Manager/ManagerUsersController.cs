using Application.Features.Auth.Queries.CurrentUser;
using Application.Features.Auth.Queries.GetAllUsers;
using Domain.Consts;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace WebAPI.Controllers.Manager
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize(Roles = Roles.Manager)]
    public class ManagerUsersController : ControllerBase
    {
        private readonly IMediator _mediator;

        public ManagerUsersController(IMediator mediator)
        {
            _mediator = mediator;
        }

        [HttpGet]
        public async Task<IActionResult> GetAll([FromQuery] string? role, CancellationToken cancellationToken)
        {
            var query = new GetAllUsersQuery(role);
            var allUsers = await _mediator.Send(query, cancellationToken);

            if (allUsers == null || !allUsers.Any())
            {
                return NotFound("No users found.");
            }

            return Ok(allUsers);
        }

        [HttpGet("{id:guid}")]
        public async Task<IActionResult> GetUserById(Guid id, CancellationToken cancellationToken)
        {
            var user = await _mediator.Send(new CurrentUserQuery(id), cancellationToken);
            return user == null ? NotFound("User not found.") : Ok(user);
        }
    }
}
