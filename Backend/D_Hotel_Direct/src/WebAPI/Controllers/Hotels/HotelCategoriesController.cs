using Application.Features.Hotels.Commands.CreateHotelCategory;
using Application.Features.Hotels.Commands.DeleteHotelCategory;
using Application.Features.Hotels.Commands.UpdateHotelCategory;
using Application.Features.Hotels.Queries.GetAllHotelCategories;
using Application.Features.Hotels.Queries.GetHotelCategoryById;
using Microsoft.AspNetCore.Mvc;

namespace WebAPI.Controllers.Hotels
{
    [Route("api/[controller]")]
    [ApiController]
    public class HotelCategoriesController : ControllerBase
    {
        private readonly IMediator _mediator;

        public HotelCategoriesController(IMediator mediator)
        {
            _mediator = mediator;
        }

        [HttpPost]
        public async Task<IActionResult> Create([FromBody] CreateHotelCategoryCommand command, CancellationToken cancellationToken)
        {
            var result = await _mediator.Send(command, cancellationToken);
            //return CreatedAtAction(nameof(GetHotelById), new { id = result.Id }, result);
            return Ok(result);
        }

        [HttpPut("{id:int}")]
        public async Task<IActionResult> Update(int id, [FromBody] UpdateHotelCategoryCommand command, CancellationToken cancellationToken)
        {
            if (command.Dto == null || command.Dto.Id <= 0 || id != command.Dto.Id)
            {
                return BadRequest("Invalid hotel category ID.");
            }
            await _mediator.Send(command, cancellationToken);
            return NoContent();
        }

        [HttpDelete]
        public async Task<IActionResult> Delete([FromBody] DeleteHotelCategoryCommand command, CancellationToken cancellationToken)
        {
            if (command.Dto == null || command.Dto.Id <= 0)
            {
                return BadRequest("Invalid hotel category ID.");
            }
            await _mediator.Send(command, cancellationToken);
            return NoContent();
        }

        [HttpGet]
        public async Task<IActionResult> GetAllAsync(CancellationToken cancellationToken)
        {
            var query = new GetAllHotelCategoriesQuery();
            var result = await _mediator.Send(query, cancellationToken);
            return Ok(result);
        }

        [HttpGet("{id:int}")]
        public async Task<IActionResult> GetByIdAsync(int id, CancellationToken cancellationToken)
        {
            if (id <= 0)
            {
                return BadRequest("Invalid hotel category ID.");
            }
            var query = new GetHotelCategoryByIdQuery(id);
            var result = await _mediator.Send(query, cancellationToken);
            if (result == null)
            {
                return NotFound("Hotel category not found.");
            }
            return Ok(result);
        }
    }
}
