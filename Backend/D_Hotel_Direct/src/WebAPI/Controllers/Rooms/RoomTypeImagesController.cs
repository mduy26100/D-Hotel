using Application.Features.Rooms.Commands.RoomTypeImage.CreateRoomTypeImage;
using Application.Features.Rooms.Commands.RoomTypeImage.DeleteRoomTypeImage;
using Application.Features.Rooms.Commands.RoomTypeImage.UpdateRoomTypeImage;
using Application.Features.Rooms.DTOs;
using Application.Features.Rooms.Queries.RoomTypeImage.GetRoomImagesByRoomTypeId;
using Microsoft.AspNetCore.Mvc;

namespace WebAPI.Controllers.Rooms
{
    [Route("api/[controller]")]
    [ApiController]
    public class RoomTypeImagesController : ControllerBase
    {
        private readonly IMediator _mediator;

        public RoomTypeImagesController(IMediator mediator)
        {
            _mediator = mediator;
        }

        // POST: api/roomtypeimages
        [HttpPost]
        [Consumes("multipart/form-data")]
        public async Task<IActionResult> Create([FromForm] int roomTypeId, IFormFile image, CancellationToken cancellationToken)
        {
            Stream? imageStream = null;
            if (image != null)
            {
                imageStream = image.OpenReadStream();
            }

            var command = new CreateRoomTypeImageCommand(
                    roomTypeId,
                    imageStream,
                    image?.FileName,
                    image?.ContentType
                );

            var result = await _mediator.Send(command, cancellationToken);

            return Ok(result);
        }

        // PUT: api/roomtypeimages/{id}
        [HttpPut("{id:int}")]
        [Consumes("multipart/form-data")]
        public async Task<IActionResult> Update(
            int id,
            [FromForm] int roomTypeId,
            IFormFile? image,
            CancellationToken cancellationToken)
        {
            Stream? imageStream = null;
            if (image != null)
            {
                imageStream = image.OpenReadStream();
            }

            var command = new UpdateRoomTypeImageCommand(
                    id,
                    roomTypeId,
                    imageStream,
                    image?.FileName,
                    image?.ContentType
                );

            var result = await _mediator.Send(command, cancellationToken);

            return NoContent();
        }

        // DELETE: api/roomtypeimages
        [HttpDelete]
        public async Task<IActionResult> Delete([FromBody] DeleteRoomTypeImageCommand command, CancellationToken cancellationToken)
        {
            await _mediator.Send(command, cancellationToken);
            return NoContent();
        }

        // GET: api/roomtypeimages/roomtypes/{roomTypeId}
        [HttpGet("roomtypes/{roomTypeId:int}")]
        public async Task<IActionResult> GetByRoomTypeId(int roomTypeId, CancellationToken cancellationToken)
        {
            var query = new GetRoomImagesByRoomTypeIdQuery(roomTypeId);
            var result = await _mediator.Send(query, cancellationToken);
            return Ok(result);
        }
    }
}
