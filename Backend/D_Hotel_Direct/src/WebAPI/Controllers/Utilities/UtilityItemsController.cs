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
    public class UtilityItemsController : ControllerBase
    {
        private readonly IMediator _mediator;

        public UtilityItemsController(IMediator mediator)
        {
            _mediator = mediator;
        }

        [HttpPost]
        public async Task<IActionResult> Create([FromBody] CreateUtilityItemCommand command, CancellationToken cancellationToken)
        {
            if (command.Dto == null || command.Dto.UtilityId <= 0)
            {
                return BadRequest("Invalid utility item data.");
            }
            var result = await _mediator.Send(command, cancellationToken);
            return Ok(result);
        }

        [HttpPut("{id:int}")]
        public async Task<IActionResult> UpdateUtilityItem(int id, [FromBody] UpdateUtilityItemCommand command, CancellationToken cancellationToken)
        {
            if (command.Dto == null || command.Dto.Id != id || command.Dto.UtilityId <= 0)
            {
                return BadRequest("Invalid utility item data.");
            }
            await _mediator.Send(command, cancellationToken);
            return NoContent();
        }

        [HttpDelete]
        public async Task<IActionResult> DeleteUtilityItem(DeleteUtilityItemCommand command, CancellationToken cancellationToken)
        {
            if (command.Dto == null || command.Dto.Id <= 0)
            {
                return BadRequest("Invalid utility item ID.");
            }
            await _mediator.Send(command, cancellationToken);
            return NoContent();
        }

        [HttpGet("utilities/{utilityId:int}")]
        public async Task<IActionResult> GetByUtilityId(int utilityId, CancellationToken cancellationToken)
        {
            if (utilityId <= 0)
            {
                return BadRequest("Invalid utility ID.");
            }

            var query = new GetUtilityItemsByUtilityIdQuery(utilityId);
            var result = await _mediator.Send(query, cancellationToken);
            return Ok(result);
        }

        [HttpGet("hotels/{hotelId:int}")]
        public async Task<IActionResult> GetByHotelId(int hotelId, CancellationToken cancellationToken)
        {
            if (hotelId <= 0)
            {
                return BadRequest("Invalid hotel ID.");
            }

            var query = new GetUtilityByHotelIdQuery(hotelId);
            var result = await _mediator.Send(query, cancellationToken);
            return Ok(result);
        }

        [HttpGet("rooms/{roomId:int}")]
        public async Task<IActionResult> GetByRoomId(int roomId, CancellationToken cancellationToken)
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
