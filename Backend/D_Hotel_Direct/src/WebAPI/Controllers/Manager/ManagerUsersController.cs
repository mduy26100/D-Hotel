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
        public async Task<IActionResult> GetAll(CancellationToken cancellationToken)
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
