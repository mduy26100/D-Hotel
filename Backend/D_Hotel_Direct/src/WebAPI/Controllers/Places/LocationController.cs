using Application.Features.Places.Commands.CreateHotelLocation;
using Application.Features.Places.Commands.CreateLocation;
using Application.Features.Places.Commands.DeleteLocation;
using Application.Features.Places.Commands.UpdateHotelLocation;
using Application.Features.Places.Commands.UpdateLocation;
using Application.Features.Places.DTOs;
using Application.Features.Places.Queries.GetAllLocations;
using Application.Features.Places.Queries.GetHotelLocationByHotelId;
using Application.Features.Places.Queries.GetHotelLocationByLocationId;
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

        [HttpPost("create-location")]
        [Consumes("multipart/form-data")]
        public async Task<ActionResult> CreateLocation([FromForm] string name, IFormFile? image, CancellationToken cancellationToken)
        {
            Stream? imageStream = null;
            if (image != null)
            {
                imageStream = image.OpenReadStream();
            }
            var command = new CreateLocationCommand(
                name,
                imageStream,
                image?.FileName,
                image?.ContentType
            );
            var result = await _mediator.Send(command, cancellationToken);
            return Ok(result);
        }

        [HttpPut("update-location")]
        [Consumes("multipart/form-data")]
        public async Task<ActionResult> UpdateLocation([FromBody] int id, [FromForm] string name, IFormFile? image, CancellationToken cancellationToken)
        {
            Stream? imageStream = null;
            if (image != null)
            {
                imageStream = image.OpenReadStream();
            }

            var dto = new LocationsDto
            {
                Id = id,
                Name = name
            };

            var command = new UpdateLocationCommand(
                dto,
                imageStream,
                image?.FileName,
                image?.ContentType
            );

            await _mediator.Send(command, cancellationToken);

            return NoContent();
        }

        [HttpDelete("delete-location")]
        public async Task<ActionResult> DeleteLocation(DeleteLocationCommand command, CancellationToken cancellationToken)
        {
            if (command.dto == null || command.dto.Id <= 0)
            {
                return BadRequest("Invalid location ID.");
            }

            await _mediator.Send(command, cancellationToken);
            return NoContent();
        }

        [HttpGet("get-all-locations")]
        public async Task<ActionResult> GetAllLocations(CancellationToken cancellationToken)
        {
            var query = new GetAllLocationsQuery();
            var result = await _mediator.Send(query, cancellationToken);
            return Ok(result);
        }

        [HttpGet("get-location-by-id")]
        public async Task<ActionResult> GetLocationById(int id, CancellationToken cancellationToken)
        {
            if (id <= 0)
            {
                return BadRequest("Invalid location ID.");
            }
            var query = new GetLocationByIdQuery(id);
            var result = await _mediator.Send(query, cancellationToken);
            if (result == null)
            {
                return NotFound();
            }
            return Ok(result);
        }
    }
}
