using Application.Features.Places.Commands.CreateLocation;
using Application.Features.Places.Commands.DeleteLocation;
using Application.Features.Places.Commands.UpdateLocation;
using Application.Features.Places.DTOs;
using Application.Features.Places.Queries.GetAllLocations;
using Application.Features.Places.Queries.GetLocationById;
using Microsoft.AspNetCore.Mvc;

namespace WebAPI.Controllers.Places
{
    [Route("api/[controller]")]
    [ApiController]
    public class LocationController : ControllerBase
    {
        private readonly IMediator _mediator;

        public LocationController(IMediator mediator)
        {
            _mediator = mediator;
        }

        [HttpPost]
        [Consumes("multipart/form-data")]
        public async Task<ActionResult> CreateLocation(
            [FromForm] string name,
            IFormFile? image,
            CancellationToken cancellationToken)
        {
            Stream? imageStream = image?.OpenReadStream();

            var command = new CreateLocationCommand(name, imageStream, image?.FileName, image?.ContentType);
            var result = await _mediator.Send(command, cancellationToken);

            return CreatedAtAction(nameof(GetLocationById), new { id = result.Id }, result);
        }

        [HttpPut("{id:int}")]
        [Consumes("multipart/form-data")]
        public async Task<ActionResult> UpdateLocation(
            int id,
            [FromForm] string name,
            IFormFile? image,
            CancellationToken cancellationToken)
        {
            Stream? imageStream = image?.OpenReadStream();

            var dto = new LocationsDto { Id = id, Name = name };
            var command = new UpdateLocationCommand(dto, imageStream, image?.FileName, image?.ContentType);

            await _mediator.Send(command, cancellationToken);
            return NoContent();
        }

        [HttpDelete("{id:int}")]
        public async Task<ActionResult> DeleteLocation(
            int id,
            CancellationToken cancellationToken)
        {
            if (id <= 0)
                return BadRequest("Invalid location ID.");

            var command = new DeleteLocationCommand(new LocationsDto { Id = id });
            await _mediator.Send(command, cancellationToken);
            return NoContent();
        }

        [HttpGet]
        public async Task<ActionResult> GetAllLocations(CancellationToken cancellationToken)
        {
            var query = new GetAllLocationsQuery();
            var result = await _mediator.Send(query, cancellationToken);
            return Ok(result);
        }

        [HttpGet("{id:int}")]
        public async Task<ActionResult> GetLocationById(
            int id,
            CancellationToken cancellationToken)
        {
            if (id <= 0)
                return BadRequest("Invalid location ID.");

            var query = new GetLocationByIdQuery(id);
            var result = await _mediator.Send(query, cancellationToken);

            if (result == null)
                return NotFound();

            return Ok(result);
        }
    }
}
