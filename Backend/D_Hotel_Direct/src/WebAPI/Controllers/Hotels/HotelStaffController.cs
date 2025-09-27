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
    public class HotelStaffController : ControllerBase
    {
        private readonly IMediator _mediator;

        public HotelStaffController(IMediator mediator)
        {
            _mediator = mediator;
        }

        [HttpPost("create-hotel-staff")]
        public async Task<IActionResult> CreateHotelStaff([FromBody] CreateHotelStaffCommand command, CancellationToken cancellationToken)
        {
            var result = await _mediator.Send(command, cancellationToken);
            return Ok(result);
        }

        [HttpPut("update-hotel-staff")]
        public async Task<IActionResult> UpdateHotelStaff([FromBody] UpdateHotelStaffCommand command, CancellationToken cancellationToken)
        {
            var result = await _mediator.Send(command, cancellationToken);
            return Ok(result);
        }

        [HttpDelete("delete-hotel-staff")]
        public async Task<IActionResult> DeleteHotelStaff([FromBody] DeleteHotelStaffCommand command, CancellationToken cancellationToken)
        {
            var result = await _mediator.Send(command, cancellationToken);
            return Ok(result);
        }

        [HttpGet("get-all-hotel-staffs")]
        public async Task<IActionResult> GetAllHotelStaffs(CancellationToken cancellationToken)
        {
            var query = new GetAllHotelStaffsQuery();
            var result = await _mediator.Send(query, cancellationToken);
            return Ok(result);
        }

        [HttpGet("get-hotel-staff-by-id/{id}")]
        public async Task<IActionResult> GetHotelStaffById(int id, CancellationToken cancellationToken)
        {
            if (id <= 0)
            {
                return BadRequest("Invalid hotel staff ID.");
            }

            var query = new GetHotelStaffByIdQuery(id);
            var result = await _mediator.Send(query, cancellationToken);
            return Ok(result);
        }

        [HttpGet("get-hotel-staffs-by-hotel-id/{id}")]
        public async Task<IActionResult> GetHotelStaffsByHotelId(int id, CancellationToken cancellationToken)
        {
            if (id <= 0)
            {
                return BadRequest("Invalid hotel ID.");
            }

            var query = new GetHotelStaffsByHotelIdQuery(id);
            var result = await _mediator.Send(query, cancellationToken);
            return Ok(result);
        }
    }
}
