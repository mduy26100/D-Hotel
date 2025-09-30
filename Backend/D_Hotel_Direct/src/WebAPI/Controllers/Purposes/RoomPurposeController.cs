using Application.Features.Purposes.Commands.RoomPurpose.CreateRoomPurpose;
using Application.Features.Purposes.Commands.RoomPurpose.DeleteRoomPurpose;
using Application.Features.Purposes.Commands.RoomPurpose.UpdateRoomPurpose;
using Application.Features.Purposes.Queries.RoomPurpose.GetAllRoomPurposes;
using Application.Features.Purposes.Queries.RoomPurpose.GetRoomPurposeById;
using Microsoft.AspNetCore.Mvc;

namespace WebAPI.Controllers.Purposes
{
    [Route("api/[controller]")]
    [ApiController]
    public class RoomPurposeController : ControllerBase
    {
        private readonly IMediator _mediator;

        public RoomPurposeController(IMediator mediator)
        {
            _mediator = mediator;
        }

        [HttpPost("create-room-purpose")]
        public async Task<IActionResult> CreateRoomPurpose([FromBody] CreateRoomPurposeCommand command, CancellationToken cancellationToken)
        {
            var reuslt = await _mediator.Send(command, cancellationToken);
            return Ok(reuslt);
        }

        [HttpDelete("delete-room-purpose")]
        public async Task<IActionResult> DeleteRoomPurpose([FromBody] DeleteRoomPurposeCommand command, CancellationToken cancellationToken)
        {
            var result = await _mediator.Send(command, cancellationToken);
            return Ok(result);
        }

        [HttpPut("update-room-purpose/{id}")]
        public async Task<IActionResult> UpdateRoomPurpose(int id, UpdateRoomPurposeCommand command, CancellationToken cancellationToken)
        {
            var result = await _mediator.Send(command, cancellationToken);
            return Ok(result);
        }

        [HttpGet("get-all-room-purposes")]
        public async Task<IActionResult> GetAllRoomPurposes(CancellationToken cancellationToken)
        {
            var query = new GetAllRoomPurposesQuery();
            var reuslt = await _mediator.Send(query, cancellationToken);
            return Ok(reuslt);
        }

        [HttpGet("get-room-purpose-by/{id}")]
        public async Task<IActionResult> GetRoomPurposeById(int id, CancellationToken cancellationToken)
        {
            var query = new GetRoomPurposeByIdQuery(id);
            var result = await _mediator.Send(query, cancellationToken);
            return Ok(result);
        }
    }
}
