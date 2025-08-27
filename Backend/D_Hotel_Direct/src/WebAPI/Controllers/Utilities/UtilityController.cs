using Application.Features.Utilities.Commands.CreateUtility;
using Application.Features.Utilities.Commands.DeleteUtility;
using Application.Features.Utilities.Commands.UpdateUtility;
using Application.Features.Utilities.DTOs;
using Application.Features.Utilities.Queries.GetAllUtilities;
using Application.Features.Utilities.Queries.GetUtilityById;
using Microsoft.AspNetCore.Mvc;

namespace WebAPI.Controllers.Utilities
{
    [Route("api/[controller]")]
    [ApiController]
    public class UtilityController : ControllerBase
    {
        private readonly IMediator _mediator;

        public UtilityController(IMediator mediator)
        {
            _mediator = mediator;
        }

        [HttpPost("create-utility")]
        [Consumes("multipart/form-data")]
        public async Task<IActionResult> CreateUtility([FromForm] string name, IFormFile? image, CancellationToken cancellationToken)
        {
            Stream? imageStream = null;
            if (image != null)
            {
                imageStream = image.OpenReadStream();
            }

            var command = new CreateUtilityCommand(
                name,
                imageStream,
                image?.FileName,
                image?.ContentType
            );

            var result = await _mediator.Send(command, cancellationToken);

            return Ok(result);
        }

        [HttpPut("update-utility/{id}")]
        [Consumes("multipart/form-data")]
        public async Task<IActionResult> UpdateUtility(int id, [FromForm] string name, IFormFile? image, CancellationToken cancellationToken)
        {
            Stream? imageStream = null;
            if (image != null)
            {
                imageStream = image.OpenReadStream();
            }

            var dto = new UtilityDto
            {
                Id = id,
                Name = name
            };

            var command = new UpdateUtilityCommand(
                dto,
                imageStream,
                image?.FileName,
                image?.ContentType
            );

            await _mediator.Send(command, cancellationToken);

            return NoContent();
        }

        [HttpDelete("delete-utility")]
        public async Task<IActionResult> DeleteUtility(DeleteUtilityCommand command, CancellationToken cancellationToken)
        {
            if (command.Dto == null || command.Dto.Id <= 0)
            {
                return BadRequest("Invalid utility ID.");
            }
            await _mediator.Send(command, cancellationToken);
            return NoContent();
        }

        [HttpGet("get-all-utilities")]
        public async Task<IActionResult> GetAllUtilities(CancellationToken cancellationToken)
        {
            var query = new GetAllUtilitiesQuery();
            var result = await _mediator.Send(query, cancellationToken);
            return Ok(result);
        }

        [HttpGet("get-utility-by-id")]
        public async Task<IActionResult> GetUtilityById([FromQuery] int id, CancellationToken cancellationToken)
        {
            if (id <= 0)
            {
                return BadRequest("Invalid utility ID.");
            }
            var query = new GetUtilityByIdQuery(id);
            var result = await _mediator.Send(query, cancellationToken);
            if (result == null)
            {
                return NotFound();
            }
            return Ok(result);
        }
    }
}