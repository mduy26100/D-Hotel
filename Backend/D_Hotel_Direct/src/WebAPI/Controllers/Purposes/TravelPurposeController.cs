using Application.Features.Purposes.Commands.TravelPurpose.CreateTravelPurpose;
using Application.Features.Purposes.Commands.TravelPurpose.DeleteTravelPurpose;
using Application.Features.Purposes.Commands.TravelPurpose.UpdateTravelPurpose;
using Application.Features.Purposes.Queries.TravelPurpose.GetAllTravelPurposes;
using Application.Features.Purposes.Queries.TravelPurpose.GetTravelPurposeById;
using Microsoft.AspNetCore.Mvc;

namespace WebAPI.Controllers.Purposes
{
    [Route("api/[controller]")]
    [ApiController]
    public class TravelPurposeController : ControllerBase
    {
        private readonly IMediator _mediator;

        public TravelPurposeController(IMediator mediator)
        {
            _mediator = mediator;
        }

        [HttpPost("create-travel-purpose")]
        public async Task<IActionResult> CreateTravelPurpose([FromBody] CreateTravelPurposeCommand command, CancellationToken cancellationToken)
        {
            var result = await _mediator.Send(command, cancellationToken);
            return Ok(result);
        }

        [HttpDelete("delete-travel-purpose")]
        public async Task<IActionResult> DeleteTravelPurpose([FromBody] DeleteTravelPurposeCommand command, CancellationToken cancellationToken)
        {
            var result = await _mediator.Send(command, cancellationToken);
            return Ok(result);
        }

        [HttpPut("update-travel-purpose/{id}")]
        public async Task<IActionResult> UpdateTravelPurpose(int id, [FromBody] UpdateTravelPurposeCommand command, CancellationToken cancellationToken)
        {
            var result = await _mediator.Send(command, cancellationToken);
            return Ok(result);
        }

        [HttpGet("get-all-travel-purposes")]
        public async Task<IActionResult> GetAllTravelPurposes(CancellationToken cancellationToken)
        {
            var query = new GetAllTravelPurposesQuery();
            var result = await _mediator.Send(query, cancellationToken);
            return Ok(result);
        }

        [HttpGet("get-travel-purpose-by/{id}")]
        public async Task<IActionResult> GetTravelPurposeById(int id, CancellationToken cancellationToken)
        {
            var query = new GetTravelPurposeByIdQuery(id);
            var result = await _mediator.Send(query, cancellationToken);
            return Ok(result);
        }
    }
}
