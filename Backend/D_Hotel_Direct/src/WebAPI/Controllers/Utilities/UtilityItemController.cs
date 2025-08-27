using Application.Features.Utilities.Commands.CreateUtilityItem;
using Application.Features.Utilities.Commands.DeleteUtilityItem;
using Application.Features.Utilities.Commands.UpdateUtilityItem;
using Application.Features.Utilities.Queries.GetUtilityByHotelId;
using Application.Features.Utilities.Queries.GetUtilityByRoomId;
using Application.Features.Utilities.Queries.GetUtilityItemsByUtilityId;
using Microsoft.AspNetCore.Mvc;

namespace WebAPI.Controllers.Utilities
{
    [Route("api/[controller]")]
    [ApiController]
    public class UtilityItemController : ControllerBase
    {
        private readonly IMediator _mediator;

        public UtilityItemController(IMediator mediator)
        {
            _mediator = mediator;
        }

        [HttpPost("create-utility-item")]
        public async Task<IActionResult> CreateUtilityItem([FromBody] CreateUtilityItemCommand command, CancellationToken cancellationToken)
        {
            if (command.Dto == null || command.Dto.UtilityId <= 0)
            {
                return BadRequest("Invalid utility item data.");
            }
            var result = await _mediator.Send(command, cancellationToken);
            return Ok(result);
        }

        [HttpPut("update-utility-item/{id}")]
        public async Task<IActionResult> UpdateUtilityItem(int id, [FromBody] UpdateUtilityItemCommand command, CancellationToken cancellationToken)
        {
            if (command.Dto == null || command.Dto.Id != id || command.Dto.UtilityId <= 0)
            {
                return BadRequest("Invalid utility item data.");
            }
            await _mediator.Send(command, cancellationToken);
            return NoContent();
        }

        [HttpDelete("delete-utility-item")]
        public async Task<IActionResult> DeleteUtilityItem(DeleteUtilityItemCommand command, CancellationToken cancellationToken)
        {
            if (command.Dto == null || command.Dto.Id <= 0)
            {
                return BadRequest("Invalid utility item ID.");
            }
            await _mediator.Send(command, cancellationToken);
            return NoContent();
        }

        [HttpGet("get-utility-items-by-utility-id")]
        public async Task<IActionResult> GetUtilityItemsByUtilityId([FromQuery] int utilityId, CancellationToken cancellationToken)
        {
            if (utilityId <= 0)
            {
                return BadRequest("Invalid utility ID.");
            }
            var query = new GetUtilityItemsByUtilityIdQuery(utilityId);
            var result = await _mediator.Send(query, cancellationToken);
            return Ok(result);
        }

        [HttpGet("get-utility-items-by-hotel-id")]
        public async Task<IActionResult> GetUtilityItemsByHotelId([FromQuery] int hotelId, CancellationToken cancellationToken)
        {
            if (hotelId <= 0)
            {
                return BadRequest("Invalid hotel ID.");
            }
            var query = new GetUtilityByHotelIdQuery(hotelId);
            var result = await _mediator.Send(query, cancellationToken);
            return Ok(result);
        }

        [HttpGet("get-utility-items-by-room-id")]
        public async Task<IActionResult> GetUtilityItemsByRoomId([FromQuery] int roomId, CancellationToken cancellationToken)
        {
            if (roomId <= 0)
            {
                return BadRequest("Invalid room ID.");
            }
            var query = new GetUtilityByRoomIdQuery(roomId);
            var result = await _mediator.Send(query, cancellationToken);
            return Ok(result);
        }
    }
}
