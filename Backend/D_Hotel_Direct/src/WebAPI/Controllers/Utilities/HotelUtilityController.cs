using Application.Features.Utilities.Commands.CreateHotelUtility;
using Application.Features.Utilities.Commands.DeleteHotelUtility;
using Microsoft.AspNetCore.Mvc;

namespace WebAPI.Controllers.Utilities
{
    [Route("api/[controller]")]
    [ApiController]
    public class HotelUtilityController : ControllerBase
    {
        private readonly IMediator _mediator;

        public HotelUtilityController(IMediator mediator)
        {
            _mediator = mediator;
        }

        [HttpPost("create-utilities-to-hotel")]
        public async Task<IActionResult> Create([FromForm] int hotelId, [FromForm] string utilityIds, CancellationToken cancellationToken)
        {
            var command = new CreateHotelUtilityCommand(hotelId, utilityIds);

            var result = await _mediator.Send(command, cancellationToken);
            return Ok(result);
        }

        [HttpPut("update-utilities-to-hotel")]
        public async Task<IActionResult> Update([FromForm] int hotelId, [FromForm] string utilityIds, CancellationToken cancellationToken)
        {
            var command = new CreateHotelUtilityCommand(hotelId, utilityIds);
            var result = await _mediator.Send(command, cancellationToken);
            return Ok(result);
        }

        [HttpDelete("remove-utilities-from-hotel")]
        public async Task<IActionResult> Delete([FromQuery] int hotelId, [FromQuery] string utilityIds, CancellationToken cancellationToken)
        {
            var command = new DeleteHotelUtilityCommand(hotelId, utilityIds);

            await _mediator.Send(command, cancellationToken);
            return Ok("Hotel utilities deleted successfully");
        }
    }
}
