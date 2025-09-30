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
    public class HotelTravelPurposeController : ControllerBase
    {
        private readonly IMediator _mediator;

        public HotelTravelPurposeController(IMediator mediator)
        {
            _mediator = mediator;
        }

        [HttpPost("create-hotel-travel-purpose")]
        public async Task<IActionResult> CreateHotelTravelPurpose([FromBody] CreateHotelTravelPurposeCommand command, CancellationToken cancellationToken)
        {
            var result = await _mediator.Send(command, cancellationToken);
            return Ok(result);
        }

        [HttpDelete("delete-hotel-travel-purpose")]
        public async Task<IActionResult> DeleteHotelTravelPurpose([FromBody] DeleteHotelTravelPurposeCommand command, CancellationToken cancellationToken)
        {
            var result = await _mediator.Send(command, cancellationToken);
            return Ok(result);
        }

        [HttpPut("update-hotel-travel-purpose/{id}")]
        public async Task<IActionResult> UpdateHotelTravelPurpose(int id, [FromBody] UpdateHotelTravelPurposeCommand command, CancellationToken cancellationToken)
        {
            var result = await _mediator.Send(command, cancellationToken);
            return Ok(result);
        }

        [HttpGet("get-all-hotel-travel-purpose")]
        public async Task<IActionResult> GetAllHotelTravelPurpose(CancellationToken cancellationToken)
        {
            var query = new GetAllHotelTravelPurposesQuery();
            var result = await _mediator.Send(query, cancellationToken);
            return Ok(result);
        }

        [HttpGet("get-hotels-by-travel-purpose-id/{id}")]
        public async Task<IActionResult> GetHotelsByTravelPurposeId(int id, CancellationToken cancellationToken)
        {
            var query = new GetHotelsByTravelPurposeIdQuery(id);
            var result = await _mediator.Send(query, cancellationToken);
            return Ok(result);
        }

        [HttpGet("get-travel-purpose-by-hotel-id/{id}")]
        public async Task<IActionResult> GetTravelPurposeByHotelId(int id, CancellationToken cancellationToken)
        {
            var query = new GetTravelPurposeByHotelIdQuery(id);
            var result = await _mediator.Send(query, cancellationToken);
            return Ok(result);
        }
    }
}
