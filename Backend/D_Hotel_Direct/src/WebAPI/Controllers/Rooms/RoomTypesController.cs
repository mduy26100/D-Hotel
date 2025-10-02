using Application.Features.Rooms.Commands.RoomType.CreateRoomType;
using Application.Features.Rooms.Commands.RoomType.DeleteRoomType;
using Application.Features.Rooms.Commands.RoomType.UpdateRoomType;
using Application.Features.Rooms.Queries.RoomType.GetAllRoomTypes;
using Application.Features.Rooms.Queries.RoomType.GetRoomTypeByBedTypeId;
using Application.Features.Rooms.Queries.RoomType.GetRoomTypeById;
using Application.Features.Rooms.Queries.RoomType.GetRoomTypeByQuantityGuestId;
using Microsoft.AspNetCore.Mvc;

namespace WebAPI.Controllers.Rooms
{
    [Route("api/[controller]")]
    [ApiController]
    public class RoomTypesController : ControllerBase
    {
        private readonly IMediator _mediator;

        public RoomTypesController(IMediator mediator)
        {
            _mediator = mediator;
        }

        // POST: api/roomtypes
        [HttpPost]
        public async Task<IActionResult> Create([FromBody] CreateRoomTypeCommand command, CancellationToken cancellationToken)
        {
            var result = await _mediator.Send(command, cancellationToken);
            return CreatedAtAction(nameof(GetById), new { id = result.Id }, result);
        }

        // DELETE: api/roomtypes
        [HttpDelete]
        public async Task<IActionResult> Delete([FromBody] DeleteRoomTypeCommand command, CancellationToken cancellationToken)
        {
            await _mediator.Send(command, cancellationToken);
            return NoContent();
        }

        // PUT: api/roomtypes/{id}
        [HttpPut("{id}")]
        public async Task<IActionResult> Update(int id, [FromBody] UpdateRoomTypeCommand command, CancellationToken cancellationToken)
        {
            command.dto.Id = id;
            var result = await _mediator.Send(command, cancellationToken);
            return Ok(result);
        }

        // GET: api/roomtypes
        [HttpGet]
        public async Task<IActionResult> GetAll(CancellationToken cancellationToken)
        {
            var query = new GetAllRoomTypesQuery();
            var result = await _mediator.Send(query, cancellationToken);
            return Ok(result);
        }

        // GET: api/roomtypes/{id}
        [HttpGet("{id}")]
        public async Task<IActionResult> GetById(int id, CancellationToken cancellationToken)
        {
            var query = new GetRoomTypeByIdQuery(id);
            var result = await _mediator.Send(query, cancellationToken);
            return Ok(result);
        }

        // GET: api/bedtypes/{bedTypeId}/roomtypes
        [HttpGet("/api/bedtypes/{bedTypeId}/roomtypes")]
        public async Task<IActionResult> GetByBedTypeId(int bedTypeId, CancellationToken cancellationToken)
        {
            var query = new GetRoomTypeByBedTypeIdQuery(bedTypeId);
            var result = await _mediator.Send(query, cancellationToken);
            return Ok(result);
        }

        // GET: api/quantityguests/{quantityGuestId}/roomtypes
        [HttpGet("/api/quantityguests/{quantityGuestId}/roomtypes")]
        public async Task<IActionResult> GetByQuantityGuestId(int quantityGuestId, CancellationToken cancellationToken)
        {
            var query = new GetRoomTypeByQuantityGuestIdQuery(quantityGuestId);
            var result = await _mediator.Send(query, cancellationToken);
            return Ok(result);
        }
    }
}
