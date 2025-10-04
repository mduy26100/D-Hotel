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
    public class UtilitiesController : ControllerBase
    {
        private readonly IMediator _mediator;

        public UtilitiesController(IMediator mediator)
        {
            _mediator = mediator;
        }

        [HttpPost]
        [Consumes("multipart/form-data")]
        public async Task<IActionResult> Create([FromForm] string name, IFormFile? image, CancellationToken cancellationToken)
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

        [HttpPut("{id:int}")]
        [Consumes("multipart/form-data")]
        public async Task<IActionResult> Update(int id, [FromForm] string name, IFormFile? image, CancellationToken cancellationToken)
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

        [HttpDelete]
        public async Task<IActionResult> Delete(DeleteUtilityCommand command, CancellationToken cancellationToken)
        {
            if (command.Dto == null || command.Dto.Id <= 0)
            {
                return BadRequest("Invalid utility ID.");
            }
            await _mediator.Send(command, cancellationToken);
            return NoContent();
        }

        [HttpGet]
        public async Task<IActionResult> GetAllAsync(CancellationToken cancellationToken)
        {
            var query = new GetAllUtilitiesQuery();
            var result = await _mediator.Send(query, cancellationToken);
            return Ok(result);
        }

        [HttpGet("{id:int}")]
        public async Task<IActionResult> GetByIdAsync(int id, CancellationToken cancellationToken)
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