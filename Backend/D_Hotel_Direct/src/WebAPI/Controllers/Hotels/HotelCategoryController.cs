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
    public class HotelCategoryController : ControllerBase
    {
        private readonly IMediator _mediator;

        public HotelCategoryController(IMediator mediator)
        {
            _mediator = mediator;
        }

        [HttpPost("create-hotel-category")]
        public async Task<IActionResult> CreateHotelCategory([FromBody] CreateHotelCategoryCommand command, CancellationToken cancellationToken)
        {
            var result = await _mediator.Send(command, cancellationToken);
            //return CreatedAtAction(nameof(GetHotelById), new { id = result.Id }, result);
            return Ok(result);
        }

        [HttpPut("update-hotel-category")]
        public async Task<IActionResult> UpdateHotelCategory([FromBody] UpdateHotelCategoryCommand command, CancellationToken cancellationToken)
        {
            if (command.Dto == null || command.Dto.Id <= 0)
            {
                return BadRequest("Invalid hotel category ID.");
            }
            await _mediator.Send(command, cancellationToken);
            return NoContent();
        }

        [HttpDelete("delete-hotel-category/{id}")]
        public async Task<IActionResult> DeleteHotelCategory(DeleteHotelCategoryCommand command, CancellationToken cancellationToken)
        {
            if (command.Dto == null || command.Dto.Id <= 0)
            {
                return BadRequest("Invalid hotel category ID.");
            }
            await _mediator.Send(command, cancellationToken);
            return NoContent();
        }

        [HttpGet("get-all-hotel-categories")]
        public async Task<IActionResult> GetAllHotelCategories(CancellationToken cancellationToken)
        {
            var query = new GetAllHotelCategoriesQuery();
            var result = await _mediator.Send(query, cancellationToken);
            return Ok(result);
        }

        [HttpGet("get-hotel-category-by-id/{id}")]
        public async Task<IActionResult> GetHotelCategoryById(int id, CancellationToken cancellationToken)
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
