using Application.Features.Auth.Commands.Logout;
using Application.Features.Auth.Commands.TokenRefresh;
using Application.Features.Auth.Commands.UpdateProfile;
using Application.Features.Auth.DTOs;
using Application.Features.Auth.Queries.CurrentUser;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace WebAPI.Controllers.Auth
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize]
    public class AccountController : ControllerBase
    {
        private readonly IMediator _mediator;

        public AccountController(IMediator mediator)
        {
            _mediator = mediator;
        }

        [HttpPost("token-refresh")]
        public async Task<IActionResult> TokenRefresh([FromBody] TokenRefreshCommand command, CancellationToken cancellationToken)
        {
            var result = await _mediator.Send(command, cancellationToken);
            if (result == null)
            {
                return Unauthorized("Invalid or expired refresh token.");
            }
            return Ok(result);
        }

        [HttpPost("logout")]
        public async Task<IActionResult> Logout([FromBody] LogoutCommand command, CancellationToken cancellationToken)
        {
            var result = await _mediator.Send(command, cancellationToken);
            return Ok(new { message = "Logout successful" });
        }

        [HttpPost("change-password")]
        public async Task<IActionResult> ChangePassword([FromBody] ChangePasswordCommand command, CancellationToken cancellationToken)
        {
            if (command == null || command.Dto == null)
            {
                return BadRequest("Invalid change password request.");
            }
            var result = await _mediator.Send(command, cancellationToken);
            return Ok(new { message = "Password changed successfully" });
        }

        [HttpPut("update-profile")]
        [Consumes("multipart/form-data")]
        public async Task<IActionResult> UpdateProfile(
            [FromForm] Guid id,
            [FromForm] string? firstName,
            [FromForm] string? lastName,
            [FromForm] string? phoneNumber,
            [FromForm] string? role,
            IFormFile? avatarImage,
            CancellationToken cancellationToken = default)
        {
            try
            {
                Stream? imageStream = avatarImage?.OpenReadStream();

                var dto = new UpdateProfileDto
                {
                    Id = id,
                    FirstName = firstName,
                    LastName = lastName,
                    PhoneNumber = phoneNumber,
                    Role = role,
                    AvatarImageContent = imageStream,
                    AvatarImageFileName = avatarImage?.FileName,
                    AvatarImageContentType = avatarImage?.ContentType
                };

                var command = new UpdateProfileCommand(dto);
                await _mediator.Send(command, cancellationToken);

                return Ok(new { message = "Profile updated successfully" });
            }
            catch (InvalidOperationException ex)
            {
                return BadRequest(new { message = ex.Message });
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { message = "An unexpected error occurred", detail = ex.Message });
            }
        }

        [HttpGet("current-user")]
        public async Task<IActionResult> GetCurrentUser(CancellationToken cancellationToken)
        {
            var user = await _mediator.Send(new CurrentUserQuery(), cancellationToken);
            if (user == null)
            {
                return NotFound("User not found.");
            }
            return Ok(user);
        }
    }
}
