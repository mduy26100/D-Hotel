using Application.Features.Utilities.Commands.CreateHotelUtility;
using Application.Features.Utilities.Commands.DeleteHotelUtility;
using Application.Features.Utilities.Commands.UpdateHotelUtility;
using Microsoft.AspNetCore.Mvc;

namespace WebAPI.Controllers.Utilities
{
    [Route("api/[controller]")]
    [ApiController]
    public class HotelUtilitiesController : ControllerBase
    {
        private readonly IMediator _mediator;

        public HotelUtilitiesController(IMediator mediator)
        {
            _mediator = mediator;
        }

        [HttpPost]
        public async Task<IActionResult> Create([FromForm] int hotelId, [FromForm] string utilityIds, CancellationToken cancellationToken)
        {
            var command = new CreateHotelUtilityCommand(hotelId, utilityIds);

            var result = await _mediator.Send(command, cancellationToken);
            return Ok(result);
        }

        [HttpPut("{hotelId:int}")]
        public async Task<IActionResult> Update(int hotelId, [FromForm] string utilityIds, CancellationToken cancellationToken)
        {
            var command = new UpdateHotelUtilityCommand(hotelId, utilityIds);
            var result = await _mediator.Send(command, cancellationToken);
            return Ok(result);
        }

        [HttpDelete("{hotelId:int}")]
        public async Task<IActionResult> Delete(int hotelId, [FromQuery] string utilityIds, CancellationToken cancellationToken)
        {
            var command = new DeleteHotelUtilityCommand(hotelId, utilityIds);

            await _mediator.Send(command, cancellationToken);
            return Ok("Hotel utilities deleted successfully");
        }
    }
}
