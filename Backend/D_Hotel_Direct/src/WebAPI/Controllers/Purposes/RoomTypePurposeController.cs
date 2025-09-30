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
    public class RoomTypePurposeController : ControllerBase
    {
        private readonly IMediator _mediator;

        public RoomTypePurposeController(IMediator mediator)
        {
            _mediator = mediator;
        }

        [HttpPost("create-room-type-purpose")]
        public async Task<IActionResult> CreateRoomTypePurpose([FromBody] CreateRoomTypePurposeCommand command, CancellationToken cancellationToken)
        {
            var result = await _mediator.Send(command, cancellationToken);
            return Ok(result);
        }

        [HttpDelete("delete-room-type-purpose")]
        public async Task<IActionResult> DeleteRoomTypePurpose([FromBody] DeleteRoomTypePurposeCommand command, CancellationToken cancellationToken)
        {
            var result = await _mediator.Send(command, cancellationToken);
            return Ok(result);
        }

        [HttpPost("update-room-type-purpose/{id}")]
        public async Task<IActionResult> UpdateRoomTypePurpose(int id, [FromBody] UpdateRoomTypePurposeCommand command, CancellationToken cancellationToken)
        {
            var result = await _mediator.Send(command, cancellationToken);
            return Ok(result);
        }

        [HttpGet("get-all-room-type-purposes")]
        public async Task<IActionResult> GetAllRoomTypePurposes(CancellationToken cancellationToken)
        {
            var query = new GetAllRoomTypePurposesQuery();
            var result = await _mediator.Send(query, cancellationToken);
            return Ok(result);
        }

        [HttpGet("get-room-type-purpose-by-room-id/{id}")]
        public async Task<IActionResult> GetRoomTypePurposeByRoomId(int roomId, CancellationToken cancellationToken)
        {
            var query = new GetRoomPurposeByRoomIdQuery(roomId);
            var result = await _mediator.Send(query, cancellationToken);
            return Ok(result);
        }
    }
}
