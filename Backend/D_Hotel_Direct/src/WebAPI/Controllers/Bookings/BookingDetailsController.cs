using Application.Features.Bookings.Queries.BookingDetail.GetBookingDetailById;
using Application.Features.Bookings.Queries.BookingDetail.GetBookingDetailsByBookingId;
using Microsoft.AspNetCore.Mvc;

namespace WebAPI.Controllers.Bookings
{
    [Route("api/[controller]")]
    [ApiController]
    public class BookingDetailsController : ControllerBase
    {
        private readonly IMediator _mediator;

        public BookingDetailsController(IMediator mediator)
        {
            _mediator = mediator;
        }

        [HttpGet("by-booking/{bookingId}")]
        public async Task<IActionResult> GetByBookingId(int bookingId, CancellationToken cancellationToken)
        {
            var query = new GetBookingDetailsByBookingIdQuery(bookingId);
            var result = await _mediator.Send(query, cancellationToken);
            return Ok(result);
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetById(int id, CancellationToken cancellationToken)
        {
            var query = new GetBookingDetailByIdQuery(id);
            var result = await _mediator.Send(query, cancellationToken);
            return Ok(result);
        }
    }
}
