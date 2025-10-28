using Application.Features.Assistants.Interfaces;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace WebAPI.Controllers.Assistants
{
    [Route("api/[controller]")]
    [ApiController]
    public class AssistantsController : ControllerBase
    {
        private readonly IPromtService _promtService;

        public AssistantsController(IPromtService promtService)
        {
            _promtService = promtService;
        }

        [HttpPost("ask")]
        public async Task<IActionResult> AskAsync([FromBody] AskRequest request)
        {
            if (string.IsNullOrWhiteSpace(request.Prompt))
                return BadRequest("Prompt không được để trống.");

            // accountId null nghĩa là người dùng chưa đăng nhập
            var reply = await _promtService.AskAsync(request.Prompt, null);

            return Ok(new { reply });
        }

        [HttpPost("cancel")]
        public IActionResult Cancel([FromBody] CancelRequest request)
        {
            var result = _promtService.Cancel(request.Prompt, null);
            return Ok(new { canceled = result });
        }
    }

    public class AskRequest
    {
        public string Prompt { get; set; } = string.Empty;
    }

    public class CancelRequest
    {
        public string Prompt { get; set; } = string.Empty;
    }
}
