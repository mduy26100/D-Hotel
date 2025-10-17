using Application.Features.Rooms.Commands.RoomTypePrice.CreateRoomTypePrice;
using Application.Features.Rooms.Commands.RoomTypePrice.DeleteRoomTypePrice;
using Application.Features.Rooms.Commands.RoomTypePrice.UpdateRoomTypePrice;
using Application.Features.Rooms.Queries.RoomTypePrice.GetAllRoomTypePrices;
using Microsoft.AspNetCore.Mvc;

namespace WebAPI.Controllers.Rooms
{
    [Route("api/[controller]")]
    [ApiController]
    public class RoomTypePricesController : ControllerBase
    {
        private readonly IMediator _mediator;

        public RoomTypePricesController(IMediator mediator)
        {
            _mediator = mediator;
        }

        [HttpPost]
        public async Task<IActionResult> CreateRoomTypePrice([FromBody] CreateRoomTypePriceCommand command, CancellationToken cancellationToken)
        {
            var result = await _mediator.Send(command, cancellationToken);
            return Ok(result);
        }

        [HttpPut("{id:int}")]
        public async Task<IActionResult> UpdateRoomTypePrice([FromBody] UpdateRoomTypePriceCommand command, CancellationToken cancellationToken)
        {
            var result = await _mediator.Send(command, cancellationToken);
            return Ok(result);
        }

        [HttpDelete]
        public async Task<IActionResult> DeleteRoomTypePrice([FromBody] DeleteRoomTypePriceCommand command, CancellationToken cancellationToken)
        {
            var result = await _mediator.Send(command, cancellationToken);
            return NoContent();
        }

        [HttpGet]
        public async Task<IActionResult> GetAllRoomTypePrices(CancellationToken cancellationToken)
        {
            var query = new GetAllRoomTypePricesQuery();
            var result = await _mediator.Send(query, cancellationToken);
            return Ok(result);
        }
    }
}