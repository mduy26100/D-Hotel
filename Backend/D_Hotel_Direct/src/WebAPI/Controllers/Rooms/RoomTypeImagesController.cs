using Application.Features.Rooms.Commands.RoomTypeImage.CreateRoomTypeImage;
using Application.Features.Rooms.Commands.RoomTypeImage.DeleteRoomTypeImage;
using Application.Features.Rooms.Commands.RoomTypeImage.UpdateRoomTypeImage;
using Application.Features.Rooms.Queries.RoomTypeImage.GetRoomImagesByRoomTypeId;
using Microsoft.AspNetCore.Mvc;

namespace WebAPI.Controllers.Rooms
{
    [Route("api/[controller]")]
    [ApiController]
    public class RoomTypeImagesController : ControllerBase
    {
        private readonly IMediator _mediator;

        public RoomTypeImagesController(IMediator mediator)
        {
            _mediator = mediator;
        }

        // POST: api/roomtypeimages
        [HttpPost]
        public async Task<IActionResult> Create([FromBody] CreateRoomTypeImageCommand command, CancellationToken cancellationToken)
        {
            var result = await _mediator.Send(command, cancellationToken);
            return CreatedAtAction(nameof(GetByRoomTypeId), new { roomTypeId = result.RoomTypeId }, result);
        }

        // PUT: api/roomtypeimages/{id}
        [HttpPut("{id:int}")]
        public async Task<IActionResult> Update(int id, [FromBody] UpdateRoomTypeImageCommand command, CancellationToken cancellationToken)
        {
            if (id != command.requestUpsert.Id)
                return BadRequest("Id in route and body do not match.");

            var result = await _mediator.Send(command, cancellationToken);
            return Ok(result);
        }

        // DELETE: api/roomtypeimages
        [HttpDelete]
        public async Task<IActionResult> Delete([FromBody] DeleteRoomTypeImageCommand command, CancellationToken cancellationToken)
        {
            await _mediator.Send(command, cancellationToken);
            return NoContent();
        }

        // GET: api/roomtypeimages/roomtypes/{roomTypeId}
        [HttpGet("roomtypes/{roomTypeId:int}")]
        public async Task<IActionResult> GetByRoomTypeId(int roomTypeId, CancellationToken cancellationToken)
        {
            var query = new GetRoomImagesByRoomTypeIdQuery(roomTypeId);
            var result = await _mediator.Send(query, cancellationToken);
            return Ok(result);
        }
    }
}
