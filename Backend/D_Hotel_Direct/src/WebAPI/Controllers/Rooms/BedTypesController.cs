using Application.Features.Rooms.Commands.BedType.CreateBedType;
using Application.Features.Rooms.Commands.BedType.DeleteBedType;
using Application.Features.Rooms.Commands.BedType.UpdateBedType;
using Application.Features.Rooms.Queries.BedType.GetAllBedTypes;
using Application.Features.Rooms.Queries.BedType.GetBedTypeById;
using Microsoft.AspNetCore.Mvc;

namespace WebAPI.Controllers.Rooms
{
    [Route("api/[controller]")]
    [ApiController]
    public class BedTypesController : ControllerBase
    {
        private readonly IMediator _mediator;

        public BedTypesController(IMediator mediator)
        {
            _mediator = mediator;
        }

        // POST: api/bedtypes
        [HttpPost]
        public async Task<IActionResult> Create([FromBody] CreateBedTypeCommand command, CancellationToken cancellationToken)
        {
            var result = await _mediator.Send(command, cancellationToken);
            return CreatedAtAction(nameof(GetById), new { id = result.Id }, result);
        }

        // DELETE: api/bedtypes
        [HttpDelete]
        public async Task<IActionResult> Delete([FromBody] DeleteBedTypeCommand command, CancellationToken cancellationToken)
        {
            var result = await _mediator.Send(command, cancellationToken);
            return NoContent();
        }

        // PUT: api/bedtypes/{id}
        [HttpPut("{id}")]
        public async Task<IActionResult> Update(int id, [FromBody] UpdateBedTypeCommand command, CancellationToken cancellationToken)
        {
            command.dto.Id = id; // gán Id từ route vào command
            var result = await _mediator.Send(command, cancellationToken);
            return Ok(result);
        }

        // GET: api/bedtypes
        [HttpGet]
        public async Task<IActionResult> GetAll(CancellationToken cancellationToken)
        {
            var query = new GetAllBedTypesQuery();
            var result = await _mediator.Send(query, cancellationToken);
            return Ok(result);
        }

        // GET: api/bedtypes/{id}
        [HttpGet("{id}")]
        public async Task<IActionResult> GetById(int id, CancellationToken cancellationToken)
        {
            var query = new GetBedTypeByIdQuery(id);
            var result = await _mediator.Send(query, cancellationToken);
            return Ok(result);
        }
    }
}
