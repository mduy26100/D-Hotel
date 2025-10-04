using Application.Features.Hotels.Commands.CreateHotel;
using Application.Features.Hotels.Commands.DeleteHotel;
using Application.Features.Hotels.Commands.UpdateHotel;
using Application.Features.Hotels.DTOs;
using Application.Features.Hotels.Queries.GetAllHotels;
using Application.Features.Hotels.Queries.GetHotelById;
using Application.Features.Hotels.Queries.GetHotelDetail;
using Application.Features.Hotels.Queries.GetHotelsByCategoryId;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace WebAPI.Controllers.Hotels
{
    [Route("api/[controller]")]
    [ApiController]
    public class HotelsController : ControllerBase
    {
        private readonly IMediator _mediator;

        public HotelsController(IMediator mediator)
        {
            _mediator = mediator;
        }

        [HttpPost]
        [Consumes("multipart/form-data")]
        public async Task<IActionResult> Create(
            [FromForm] string name,
            [FromForm] int categoryId,
            [FromForm] Guid hotelManagerId,
            [FromForm] string address,
            [FromForm] string description,
            [FromForm] bool isActive,
            IFormFile? image,
            CancellationToken cancellationToken)
        {
            Stream? imageStream = image?.OpenReadStream();

            var hotelRequest = new HotelDto
            {
                Name = name,
                CategoryId = categoryId,
                HotelManagerId = hotelManagerId,
                Address = address,
                Description = description,
                IsActive = isActive
            };

            var command = new CreateHotelCommand(
                hotelRequest,
                imageStream,
                image?.FileName,
                image?.ContentType);

            var result = await _mediator.Send(command, cancellationToken);

            return Ok(result);
        }

        [HttpPut("{id:int}")]
        [Consumes("multipart/form-data")]
        public async Task<IActionResult> Update(
            [FromForm] int id,
            [FromForm] string name,
            [FromForm] int categoryId,
            [FromForm] Guid hotelManagerId,
            [FromForm] string address,
            [FromForm] string description,
            [FromForm] bool isActive,
            IFormFile? image,
            CancellationToken cancellationToken)
        {
            Stream? imageStream = null;
            if (image != null)
            {
                imageStream = image.OpenReadStream();
            }

            var hotelRequest = new HotelDto
            {
                Id = id,
                Name = name,
                CategoryId = categoryId,
                HotelManagerId = hotelManagerId,
                Address = address,
                Description = description,
                IsActive = isActive
            };

            var command = new UpdateHotelCommand(
                hotelRequest,
                imageStream,
                image?.FileName,
                image?.ContentType);

            await _mediator.Send(command, cancellationToken);

            return NoContent();
        }

        [HttpDelete]
        public async Task<IActionResult> Delete(DeleteHotelCommand command, CancellationToken cancellationToken)
        {
            if (command.Dto == null || command.Dto.Id <= 0)
            {
                return BadRequest("Invalid hotel ID.");
            }
            await _mediator.Send(command, cancellationToken);
            return NoContent();
        }
        [HttpGet]
        public async Task<IActionResult> GetAllAsync(CancellationToken cancellationToken)
        {
            var query = new GetAllHotelsQuery();
            var result = await _mediator.Send(query, cancellationToken);
            return Ok(result);
        }

        [HttpGet("{id:int}")]
        public async Task<IActionResult> GetByIdAsync(int id, CancellationToken cancellationToken)
        {
            if (id <= 0)
                return BadRequest("Invalid hotel ID.");

            var query = new GetHotelByIdQuery(id);
            var result = await _mediator.Send(query, cancellationToken);

            if (result == null)
                return NotFound("Hotel not found.");

            return Ok(result);
        }

        [HttpGet("{id:int}/details")]
        public async Task<IActionResult> GetDetailsAsync(int id, CancellationToken cancellationToken)
        {
            var result = await _mediator.Send(new GetHotelDetailQuery(id), cancellationToken);
            return result == null ? NotFound() : Ok(result);
        }

        [HttpGet("category/{categoryId:int}")]
        public async Task<IActionResult> GetByCategoryAsync(int categoryId, CancellationToken cancellationToken)
        {
            if (categoryId <= 0)
                return BadRequest("Invalid category ID.");

            var query = new GetHotelsByCategoryIdQuery(categoryId);
            var result = await _mediator.Send(query, cancellationToken);

            if (result == null || !result.Any())
                return NotFound("No hotels found for the specified category.");

            return Ok(result);
        }
    }
}
