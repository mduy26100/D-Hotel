using Application.Features.Hotels.Commands.CreateHotelStaff;
using Application.Features.Hotels.Commands.DeleteHotelStaff;
using Application.Features.Hotels.Commands.UpdateHotelStaff;
using Application.Features.Hotels.Queries.GetAllHotelStaffs;
using Application.Features.Hotels.Queries.GetHotelStaffById;
using Application.Features.Hotels.Queries.GetHotelStaffsByHotelId;
using Microsoft.AspNetCore.Mvc;

namespace WebAPI.Controllers.Hotels
{
    [Route("api/[controller]")]
    [ApiController]
    public class HotelStaffsController : ControllerBase
    {
        private readonly IMediator _mediator;

        public HotelStaffsController(IMediator mediator)
        {
            _mediator = mediator;
        }

        [HttpPost]
        public async Task<IActionResult> Create([FromBody] CreateHotelStaffCommand command, CancellationToken cancellationToken)
        {
            var result = await _mediator.Send(command, cancellationToken);
            return Ok(result);
        }

        [HttpPut("{id:int}")]
        public async Task<IActionResult> Update(int id, [FromBody] UpdateHotelStaffCommand command, CancellationToken cancellationToken)
        {
            if (id != command.hotelStaffDto.Id)
                return BadRequest("Id in route and body do not match.");

            var result = await _mediator.Send(command, cancellationToken);
            return Ok(result);
        }

        [HttpDelete]
        public async Task<IActionResult> Delete([FromBody] DeleteHotelStaffCommand command, CancellationToken cancellationToken)
        {
            var result = await _mediator.Send(command, cancellationToken);
            return Ok(result);
        }

        [HttpGet]
        public async Task<IActionResult> GetAllAsync(CancellationToken cancellationToken)
        {
            var query = new GetAllHotelStaffsQuery();
            var result = await _mediator.Send(query, cancellationToken);
            return Ok(result);
        }

        [HttpGet("{id:int}")]
        public async Task<IActionResult> GetByIdAsync(int id, CancellationToken cancellationToken)
        {
            if (id <= 0)
            {
                return BadRequest("Invalid hotel staff ID.");
            }

            var query = new GetHotelStaffByIdQuery(id);
            var result = await _mediator.Send(query, cancellationToken);
            return Ok(result);
        }

        [HttpGet("{hotelId:int}/staffs")]
        public async Task<IActionResult> GetHotelStaffsAsync(int hotelId, CancellationToken cancellationToken)
        {
            if (hotelId <= 0)
                return BadRequest("Invalid hotel ID.");

            var query = new GetHotelStaffsByHotelIdQuery(hotelId);
            var result = await _mediator.Send(query, cancellationToken);
            return Ok(result);
        }
    }
}
