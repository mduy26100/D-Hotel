using Application.Features.Purposes.Commands.RoomTypePurpose.CreateRoomTypePurpose;
using Application.Features.Purposes.Commands.RoomTypePurpose.DeleteRoomTypePurpose;
using Application.Features.Purposes.Commands.RoomTypePurpose.UpdateRoomTypePurpose;
using Application.Features.Purposes.Queries.RoomTypePurpose.GetAllRoomTypePurposes;
using Application.Features.Purposes.Queries.RoomTypePurpose.GetRoomPurposeByRoomId;
using Microsoft.AspNetCore.Mvc;

namespace WebAPI.Controllers.Purposes
{
    [Route("api/[controller]")]
    [ApiController]
    public class RoomTypePurposesController : ControllerBase
    {
        private readonly IMediator _mediator;

        public RoomTypePurposesController(IMediator mediator)
        {
            _mediator = mediator;
        }

        [HttpPost]
        public async Task<IActionResult> Create([FromBody] CreateRoomTypePurposeCommand command, CancellationToken cancellationToken)
        {
            var result = await _mediator.Send(command, cancellationToken);
            return Ok(result);
        }

        [HttpDelete]
        public async Task<IActionResult> Delete([FromBody] DeleteRoomTypePurposeCommand command, CancellationToken cancellationToken)
        {
            var result = await _mediator.Send(command, cancellationToken);
            return Ok(result);
        }

        [HttpPost("{id:int}")]
        public async Task<IActionResult> Update(int id, [FromBody] UpdateRoomTypePurposeCommand command, CancellationToken cancellationToken)
        {
            var result = await _mediator.Send(command, cancellationToken);
            return Ok(result);
        }

        [HttpGet]
        public async Task<IActionResult> GetAllAsync(CancellationToken cancellationToken)
        {
            var query = new GetAllRoomTypePurposesQuery();
            var result = await _mediator.Send(query, cancellationToken);
            return Ok(result);
        }

        [HttpGet("{roomId:int}/typepurpose")]
        public async Task<IActionResult> GetRoomTypePurposeAsync(int roomId, CancellationToken cancellationToken)
        {
            if (roomId <= 0)
                return BadRequest("Invalid room ID.");

            var query = new GetRoomPurposeByRoomIdQuery(roomId);
            var result = await _mediator.Send(query, cancellationToken);
            return Ok(result);
        }
    }
}
