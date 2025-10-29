using Application.Features.Bookings.Commands.CreateBooking;
using Application.Features.Bookings.Commands.DeleteBooking;
using Application.Features.Bookings.Commands.UpdateBooking;
using Application.Features.Bookings.DTOs;
using Application.Features.Bookings.Queries.Booking.GetAllBookings;
using Application.Features.Bookings.Queries.Booking.GetBookingById;
using Application.Features.Bookings.Queries.Booking.GetBookingFullInfo;
using Application.Features.Bookings.Queries.Booking.GetBookingsByDateRange;
using Application.Features.Bookings.Queries.Booking.GetBookingsByUserId;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.SignalR;
using WebAPI.Hubs;

namespace WebAPI.Controllers.Bookings
{
    [Route("api/[controller]")]
    [ApiController]
    public class BookingsController : ControllerBase
    {
        private readonly IMediator _mediator;
        private readonly IHubContext<BookingHub> _hubContext;

        public BookingsController(IMediator mediator, IHubContext<BookingHub> hubContext)
        {
            _mediator = mediator;
            _hubContext = hubContext;
        }

        [HttpPost]
        public async Task<IActionResult> Create([FromBody] CreateBookingCommand command, CancellationToken cancellationToken)
        {
            var result = await _mediator.Send(command, cancellationToken);
            await _hubContext.Clients.All.SendAsync("BookingCreated", result, cancellationToken);
            return Ok(result);
        }

        [HttpDelete]
        public async Task<IActionResult> Delete([FromBody] DeleteBookingCommand command, CancellationToken cancellationToken)
        {
            var result = await _mediator.Send(command, cancellationToken);
            await _hubContext.Clients.All.SendAsync("BookingDeleted", command.bookingId, cancellationToken);
            return NoContent();
        }

        [HttpPut("{bookingId}")]
        public async Task<IActionResult> Update(int bookingId, [FromBody] BookingAggregateDto dto, CancellationToken cancellationToken)
        {
            if (dto == null)
                return BadRequest("Booking data is required.");

            dto.Booking.Id = bookingId;
            var command = new UpdateBookingCommand(bookingId, dto);
            await _mediator.Send(command, cancellationToken);

            // Gửi chỉ Booking object (không gửi cả DTO)
            await _hubContext.Clients.All.SendAsync("BookingUpdated", dto.Booking, cancellationToken);

            return NoContent();
        }

        [HttpGet]
        public async Task<IActionResult> GetAll(CancellationToken cancellationToken)
        {
            var query = new GetAllBookingsQuery();
            var result = await _mediator.Send(query, cancellationToken);
            return Ok(result);
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetById(int id, CancellationToken cancellationToken)
        {
            var query = new GetBookingByIdQuery(id);
            var result = await _mediator.Send(query, cancellationToken);
            return Ok(result);
        }

        [HttpGet("{bookingId}/full")]
        public async Task<IActionResult> GetFullInfo(int bookingId, CancellationToken cancellationToken)
        {
            var query = new GetBookingFullInfoQuery(bookingId);
            var result = await _mediator.Send(query, cancellationToken);
            return Ok(result);
        }

        [HttpGet("by-date-range")]
        public async Task<IActionResult> GetByDateRange([FromQuery] DateTime startDate, [FromQuery] DateTime endDate, CancellationToken cancellationToken)
        {
            var query = new GetBookingsByDateRangeQuery(startDate, endDate);
            var result = await _mediator.Send(query, cancellationToken);
            return Ok(result);
        }

        [HttpGet("by-user")]
        public async Task<IActionResult> GetByUserId(CancellationToken cancellationToken)
        {
            var query = new GetBookingsByUserIdQuery();
            var result = await _mediator.Send(query, cancellationToken);
            return Ok(result);
        }
    }
}
