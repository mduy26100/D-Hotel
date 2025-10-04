using Application.Features.Auth.Commands.Register;
using Application.Features.Auth.Commands.TokenRefresh;
using Microsoft.AspNetCore.Mvc;

namespace WebAPI.Controllers.Auth
{
    [Route("api/[controller]")]
    [ApiController]
    public class AuthenticationController : ControllerBase
    {
        private readonly IMediator _mediator;

        public AuthenticationController(IMediator mediator)
        {
            _mediator = mediator;
        }

        [HttpPost("login")]
        public async Task<IActionResult> Login([FromBody] LoginCommand command, CancellationToken cancellationToken)
        {
            if (command?.Dto == null)
                return BadRequest("Invalid login request.");

            var result = await _mediator.Send(command, cancellationToken);
            return Ok(result);
        }

        [HttpPost("register")]
        public async Task<IActionResult> Register([FromBody] RegisterCommand command, CancellationToken cancellationToken)
        {
            if (command?.Dto == null)
                return BadRequest("Invalid registration request.");

            var result = await _mediator.Send(command, cancellationToken);
            return Ok(new
            {
                message = "Registration successful",
                email = command.Dto.Email
            });
        }

        [HttpPost("token/refresh")]
        public async Task<IActionResult> RefreshToken([FromBody] TokenRefreshCommand command, CancellationToken cancellationToken)
        {
            var result = await _mediator.Send(command, cancellationToken);
            return result == null ? Unauthorized("Invalid or expired refresh token.") : Ok(result);
        }
    }
}
