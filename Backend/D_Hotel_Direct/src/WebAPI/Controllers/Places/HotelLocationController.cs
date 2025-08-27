using Application.Features.Places.Commands.CreateHotelLocation;
using Application.Features.Places.Commands.DeleteLocation;
using Application.Features.Places.Commands.UpdateHotelLocation;
using Application.Features.Places.DTOs;
using Application.Features.Places.Queries.GetHotelLocationByHotelId;
using Application.Features.Places.Queries.GetHotelLocationByLocationId;
using Microsoft.AspNetCore.Mvc;

namespace WebAPI.Controllers.Places
{
    [Route("api/[controller]")]
    [ApiController]
    public class HotelLocationController : ControllerBase
    {
        private readonly IMediator _mediator;

        public HotelLocationController(IMediator mediator)
        {
            _mediator = mediator;
        }

        [HttpPost("create-hotel-location")]
        public async Task<ActionResult> CreateHotelLocation([FromBody] CreateHotelLocationCommand command, CancellationToken cancellationToken)
        {
            if (command.dto == null || command.dto.LocationId <= 0)
            {
                return BadRequest("Invalid location data.");
            }

            var result = await _mediator.Send(command, cancellationToken);
            //return CreatedAtAction(nameof(GetLocationById), new { id = result.LocationId }, result);
            return Ok(result);
        }

        [HttpPut("update-hotel-location")]
        public async Task<ActionResult> UpdateHotelLocation(int locationId, [FromBody] UpdateHotelLocationCommand command, CancellationToken cancellationToken)
        {
            if (command.dto == null || command.dto.LocationId <= 0 || command.dto.LocationId != locationId)
            {
                return BadRequest("Invalid location data.");
            }
            var result = await _mediator.Send(command, cancellationToken);
            return NoContent();
        }

        [HttpDelete("delete-hotel-location")]
        public async Task<ActionResult> DeleteHotelLocation(int locationId, CancellationToken cancellationToken)
        {
            if (locationId <= 0)
            {
                return BadRequest("Invalid location ID.");
            }
            var command = new DeleteLocationCommand(new LocationsDto { Id = locationId });
            await _mediator.Send(command, cancellationToken);
            return NoContent();
        }

        [HttpGet("get-hotel-location-by-locationId")]
        public async Task<ActionResult> GetHotelLocationById([FromQuery] int locationId, CancellationToken cancellationToken)
        {
            if (locationId <= 0)
            {
                return BadRequest("Invalid location ID.");
            }
            var query = new GetHotelLocationByLocationIdQuery(locationId);
            var result = await _mediator.Send(query, cancellationToken);
            if (result == null)
            {
                return NotFound();
            }
            return Ok(result);
        }

        [HttpGet("get-hotel-location-by-hotelId")]
        public async Task<ActionResult> GetHotelLocationByHotelId([FromQuery] int hotelId, CancellationToken cancellationToken)
        {
            if (hotelId <= 0)
            {
                return BadRequest("Invalid hotel ID.");
            }
            var query = new GetHotelLocationByHotelIdQuery(hotelId);
            var result = await _mediator.Send(query, cancellationToken);
            if (result == null)
            {
                return NotFound();
            }
            return Ok(result);
        }
    }
}
