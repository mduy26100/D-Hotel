using Application.Features.Utilities.Commands.RoomUtitlity.CreateRoomUtility;
using Application.Features.Utilities.Commands.RoomUtitlity.DeleteRoomUtitlity;
using Application.Features.Utilities.Commands.RoomUtitlity.UpdateRoomUtility;
using Microsoft.AspNetCore.Mvc;

namespace WebAPI.Controllers.Utilities
{
    [Route("api/[controller]")]
    [ApiController]
    public class RoomUtilitiesController : ControllerBase
    {
        private readonly IMediator _mediator;

        public RoomUtilitiesController(IMediator mediator)
        {
            _mediator = mediator;
        }

        [HttpPost]
        public async Task<IActionResult> Create([FromBody] CreateRoomUtilityCommand command, CancellationToken cancellationToken)
        {
            var result = await _mediator.Send(command, cancellationToken);
            return Ok(result);
        }

        [HttpDelete]
        public async Task<IActionResult> Delete([FromBody] DeleteRoomUtitlityCommand command, CancellationToken cancellationToken)
        {
            var result = await _mediator.Send(command, cancellationToken);
            return Ok(result);
        }

        [HttpPut("{roomId:int}")]
        public async Task<IActionResult> Update(int roomId, [FromBody] UpdateRoomUtilityCommand command, CancellationToken cancellationToken)
        {
            if(roomId != command.roomId)
            {
                return BadRequest("Invalid room utility data.");
            }

            var result = await _mediator.Send(command, cancellationToken);
            return Ok(result);
        }
    }
}
