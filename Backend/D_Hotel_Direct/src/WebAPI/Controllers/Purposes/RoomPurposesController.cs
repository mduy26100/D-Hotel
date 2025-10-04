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
    public class RoomPurposesController : ControllerBase
    {
        private readonly IMediator _mediator;

        public RoomPurposesController(IMediator mediator)
        {
            _mediator = mediator;
        }

        [HttpPost]
        public async Task<IActionResult> Create([FromBody] CreateRoomPurposeCommand command, CancellationToken cancellationToken)
        {
            var reuslt = await _mediator.Send(command, cancellationToken);
            return Ok(reuslt);
        }

        [HttpDelete]
        public async Task<IActionResult> Delete([FromBody] DeleteRoomPurposeCommand command, CancellationToken cancellationToken)
        {
            var result = await _mediator.Send(command, cancellationToken);
            return Ok(result);
        }

        [HttpPut("{id:int}")]
        public async Task<IActionResult> Update(int id, UpdateRoomPurposeCommand command, CancellationToken cancellationToken)
        {
            var result = await _mediator.Send(command, cancellationToken);
            return Ok(result);
        }

        [HttpGet]
        public async Task<IActionResult> GetAllAsync(CancellationToken cancellationToken)
        {
            var query = new GetAllRoomPurposesQuery();
            var reuslt = await _mediator.Send(query, cancellationToken);
            return Ok(reuslt);
        }

        [HttpGet("{id:int}")]
        public async Task<IActionResult> GetByIdAsync(int id, CancellationToken cancellationToken)
        {
            var query = new GetRoomPurposeByIdQuery(id);
            var result = await _mediator.Send(query, cancellationToken);
            return Ok(result);
        }
    }
}
