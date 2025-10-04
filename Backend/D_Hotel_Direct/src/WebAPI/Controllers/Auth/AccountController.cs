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

        [HttpGet]
        public async Task<IActionResult> GetCurrentUser(CancellationToken cancellationToken)
        {
            var user = await _mediator.Send(new CurrentUserQuery(), cancellationToken);
            return user == null ? NotFound("User not found.") : Ok(user);
        }

        [HttpPut("profile")]
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
            var dto = new UpdateProfileDto
            {
                Id = id,
                FirstName = firstName,
                LastName = lastName,
                PhoneNumber = phoneNumber,
                Role = role,
                AvatarImageContent = avatarImage?.OpenReadStream(),
                AvatarImageFileName = avatarImage?.FileName,
                AvatarImageContentType = avatarImage?.ContentType
            };

            var command = new UpdateProfileCommand(dto);
            await _mediator.Send(command, cancellationToken);

            return Ok(new { message = "Profile updated successfully" });
        }

        [HttpPut("password")]
        public async Task<IActionResult> ChangePassword([FromBody] ChangePasswordCommand command, CancellationToken cancellationToken)
        {
            if (command?.Dto == null)
                return BadRequest("Invalid change password request.");

            await _mediator.Send(command, cancellationToken);
            return Ok(new { message = "Password changed successfully" });
        }

        [HttpPost("logout")]
        public async Task<IActionResult> Logout([FromBody] LogoutCommand command, CancellationToken cancellationToken)
        {
            await _mediator.Send(command, cancellationToken);
            return Ok(new { message = "Logout successful" });
        }
    }
}
