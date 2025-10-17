using Application.Features.Purposes.Commands.HotelTravelPurpose.CreateHotelTravelPurpose;
using Application.Features.Purposes.Commands.HotelTravelPurpose.DeleteHotelTravelPurpose;
using Application.Features.Purposes.Commands.HotelTravelPurpose.UpdateHotelTravelPurpose;
using Application.Features.Purposes.Queries.HotelTravelPurpose.GetAllHotelTravelPurposes;
using Application.Features.Purposes.Queries.HotelTravelPurpose.GetHotelsByTravelPurposeId;
using Application.Features.Purposes.Queries.HotelTravelPurpose.GetTravelPurposeByHotelId;
using Microsoft.AspNetCore.Mvc;

namespace WebAPI.Controllers.Purposes
{
    [Route("api/[controller]")]
    [ApiController]
    public class HotelTravelPurposesController : ControllerBase
    {
        private readonly IMediator _mediator;

        public HotelTravelPurposesController(IMediator mediator)
        {
            _mediator = mediator;
        }

        [HttpPost]
        public async Task<IActionResult> Create([FromBody] CreateHotelTravelPurposeCommand command, CancellationToken cancellationToken)
        {
            var result = await _mediator.Send(command, cancellationToken);
            return Ok(result);
        }

        [HttpDelete]
        public async Task<IActionResult> Delete([FromBody] DeleteHotelTravelPurposeCommand command, CancellationToken cancellationToken)
        {
            var result = await _mediator.Send(command, cancellationToken);
            return Ok(result);
        }

        [HttpPut("{hotelId:int}")]
        public async Task<IActionResult> UpdateHotelTravelPurpose(int hotelId, [FromBody] UpdateHotelTravelPurposeCommand command, CancellationToken cancellationToken)
        {
            var result = await _mediator.Send(command, cancellationToken);
            return Ok(result);
        }

        [HttpGet]
        public async Task<IActionResult> GetAllAsync(CancellationToken cancellationToken)
        {
            var query = new GetAllHotelTravelPurposesQuery();
            var result = await _mediator.Send(query, cancellationToken);
            return Ok(result);
        }

        [HttpGet("travelpurposes/{travelPurposeId:int}/hotels")]
        public async Task<IActionResult> GetHotelsByTravelPurposeIdAsync(int travelPurposeId, CancellationToken cancellationToken)
        {
            if (travelPurposeId <= 0)
                return BadRequest("Invalid travel purpose ID.");

            var query = new GetHotelsByTravelPurposeIdQuery(travelPurposeId);
            var result = await _mediator.Send(query, cancellationToken);
            return Ok(result);
        }

        [HttpGet("hotels/{hotelId:int}/travelpurpose")]
        public async Task<IActionResult> GetTravelPurposeByHotelIdAsync(int hotelId, CancellationToken cancellationToken)
        {
            if (hotelId <= 0)
                return BadRequest("Invalid hotel ID.");

            var query = new GetTravelPurposeByHotelIdQuery(hotelId);
            var result = await _mediator.Send(query, cancellationToken);
            return Ok(result);
        }
    }
}
