using Application.Features.Bookings.Commands.CreateRating;
using Application.Features.Bookings.Queries.Rating.GetRatingsByHotelId;
using Application.Features.Bookings.Queries.Rating.GetRatingsByUserId;
using Microsoft.AspNetCore.Mvc;

namespace WebAPI.Controllers.Bookings
{
    [Route("api/[controller]")]
    [ApiController]
    public class RatingsController : ControllerBase
    {
        private readonly IMediator _mediator;

        public RatingsController(IMediator mediator)
        {
            _mediator = mediator;
        }

        [HttpPost]
        public async Task<IActionResult> CreateRating(CreateRatingCommand command, CancellationToken cancellationToken)
        {
            var result = await _mediator.Send(command, cancellationToken);
            return Ok(result);
        }

        [HttpGet("hotel/{hotelId:int}")]
        public async Task<IActionResult> GetRatingByHotelId(int hotelId, CancellationToken cancellationToken)
        {
            var query = new GetRatingsByHotelIdQuery(hotelId);
            var list = await _mediator.Send(query, cancellationToken);
            return Ok(list);
        }

        [HttpGet("user")]
        public async Task<IActionResult> GetRatingsByUserId(CancellationToken cancellationToken)
        {
            var query = new GetRatingsByUserIdQuery();
            var list = await _mediator.Send(query, cancellationToken);
            return Ok(list);
        }
    }
}
