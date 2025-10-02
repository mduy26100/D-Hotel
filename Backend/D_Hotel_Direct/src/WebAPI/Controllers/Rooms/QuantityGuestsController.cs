using Application.Features.Rooms.Commands.QuantityGuest.CreateQuantityGuest;
using Application.Features.Rooms.Commands.QuantityGuest.DeleteQuantityGuest;
using Application.Features.Rooms.Commands.QuantityGuest.UpdateQuantityGuest;
using Application.Features.Rooms.Queries.QuantityGuest.GetAllQuantityGuests;
using Application.Features.Rooms.Queries.QuantityGuest.GetQuantityGuestById;
using Microsoft.AspNetCore.Mvc;

namespace WebAPI.Controllers.Rooms
{
    [Route("api/[controller]")]
    [ApiController]
    public class QuantityGuestsController : ControllerBase
    {
        private readonly IMediator _mediator;

        public QuantityGuestsController(IMediator mediator)
        {
            _mediator = mediator;
        }

        // POST: api/quantityguests
        [HttpPost]
        public async Task<IActionResult> Create([FromBody] CreateQuantityGuestCommand command, CancellationToken cancellationToken)
        {
            var result = await _mediator.Send(command, cancellationToken);
            return CreatedAtAction(nameof(GetById), new { id = result.Id }, result);
        }

        // DELETE: api/quantityguests
        [HttpDelete]
        public async Task<IActionResult> Delete([FromBody] DeleteQuantityGuestCommand command, CancellationToken cancellationToken)
        {
            await _mediator.Send(command, cancellationToken);
            return NoContent();
        }

        // PUT: api/quantityguests/{id}
        [HttpPut("{id}")]
        public async Task<IActionResult> Update(int id, [FromBody] UpdateQuantityGuestCommand command, CancellationToken cancellationToken)
        {
            command.dto.Id = id; // lấy id từ route
            var result = await _mediator.Send(command, cancellationToken);
            return Ok(result);
        }

        // GET: api/quantityguests
        [HttpGet]
        public async Task<IActionResult> GetAll(CancellationToken cancellationToken)
        {
            var query = new GetAllQuantityGuestsQuery();
            var result = await _mediator.Send(query, cancellationToken);
            return Ok(result);
        }

        // GET: api/quantityguests/{id}
        [HttpGet("{id}")]
        public async Task<IActionResult> GetById(int id, CancellationToken cancellationToken)
        {
            var query = new GetQuantityGuestByIdQuery(id);
            var result = await _mediator.Send(query, cancellationToken);
            return Ok(result);
        }
    }
}
