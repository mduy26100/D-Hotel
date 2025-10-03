using Application.Features.Bookings.Queries.Invoice.GetAllInvoices;
using Application.Features.Bookings.Queries.Invoice.GetInvoiceByBookingId;
using Application.Features.Bookings.Queries.Invoice.GetInvoiceById;
using Microsoft.AspNetCore.Mvc;

namespace WebAPI.Controllers.Bookings
{
    [Route("api/[controller]")]
    [ApiController]
    public class InvoicesController : ControllerBase
    {
        private readonly IMediator _mediator;

        public InvoicesController(IMediator mediator)
        {
            _mediator = mediator;
        }

        [HttpGet]
        public async Task<IActionResult> GetAll(CancellationToken cancellationToken)
        {
            var query = new GetAllInvoicesQuery();
            var result = await _mediator.Send(query, cancellationToken);
            return Ok(result);
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetById(int id, CancellationToken cancellationToken)
        {
            var query = new GetInvoiceByIdQuery(id);
            var result = await _mediator.Send(query, cancellationToken);
            return Ok(result);
        }

        [HttpGet("by-booking/{bookingId}")]
        public async Task<IActionResult> GetByBookingId(int bookingId, CancellationToken cancellationToken)
        {
            var query = new GetInvoiceByBookingIdQuery(bookingId);
            var result = await _mediator.Send(query, cancellationToken);
            return Ok(result);
        }
    }
}
