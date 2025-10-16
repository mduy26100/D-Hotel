using Application.Features.Places.Commands.CreateHotelLocation;
using Application.Features.Places.Commands.DeleteHotelLocation;
using Application.Features.Places.Commands.UpdateHotelLocation;
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

        [HttpPost]
        public async Task<ActionResult> CreateHotelLocation(
            [FromBody] CreateHotelLocationCommand command,
            CancellationToken cancellationToken)
        {
            if (command.dto == null || command.dto.LocationId <= 0)
                return BadRequest("Invalid location data.");

            var result = await _mediator.Send(command, cancellationToken);
            return CreatedAtAction(nameof(GetHotelLocationById), new { id = result.LocationId }, result);
        }

        [HttpPut("{locationId:int}")]
        public async Task<ActionResult> UpdateHotelLocation(int locationId, [FromBody] UpdateHotelLocationCommand command, CancellationToken cancellationToken)
        {
            if (command.dto == null || command.dto.LocationId <= 0 || command.dto.LocationId != locationId)
            {
                return BadRequest("Invalid location data.");
            }
            var result = await _mediator.Send(command, cancellationToken);
            return NoContent();
        }

        [HttpDelete]
        public async Task<ActionResult> DeleteHotelLocation(DeleteHotelLocationCommand command, CancellationToken cancellationToken)
        {
            await _mediator.Send(command, cancellationToken);
            return NoContent();
        }

        [HttpGet("{id:int}")]
        public async Task<ActionResult> GetHotelLocationById(int id, CancellationToken cancellationToken)
        {
            if (id <= 0)
            {
                return BadRequest("Invalid location ID.");
            }
            var query = new GetHotelLocationByLocationIdQuery(id);
            var result = await _mediator.Send(query, cancellationToken);
            if (result == null)
            {
                return NotFound();
            }
            return Ok(result);
        }

        [HttpGet("hotel/{hotelId:int}")]
        public async Task<ActionResult> GetHotelLocationByHotelId(
            int hotelId,
            CancellationToken cancellationToken)
        {
            if (hotelId <= 0)
                return BadRequest("Invalid hotel ID.");

            var query = new GetHotelLocationByHotelIdQuery(hotelId);
            var result = await _mediator.Send(query, cancellationToken);

            if (result == null)
                return NotFound();

            return Ok(result);
        }
    }
}
