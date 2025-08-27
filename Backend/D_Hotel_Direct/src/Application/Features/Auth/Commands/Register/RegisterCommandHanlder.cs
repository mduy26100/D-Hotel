using Application.Common.Interfaces.Logging;
using Application.Features.Auth.Services.Command.Register;
using MediatR;

namespace Application.Features.Auth.Commands.Register
{
    public class RegisterHandler : IRequestHandler<RegisterCommand>
    {
        private readonly IRegisterService _registerService;
        private readonly ILoggingService<RegisterHandler> _logger;

        public RegisterHandler(
            IRegisterService registerService,
            ILoggingService<RegisterHandler> logger)
        {
            _registerService = registerService;
            _logger = logger;
        }

        public async Task<Unit> Handle(RegisterCommand request, CancellationToken cancellationToken)
        {
            _logger.LogInformation($"[Register] Register attempt for email: {request.Dto.Email}");

            try
            {
                await _registerService.RegisterAsync(request.Dto, cancellationToken);
                _logger.LogInformation($"[Register] Register successful for email: {request.Dto.Email}");
            }
            catch (Exception ex)
            {
                _logger.LogError($"[Register] Register failed for email: {request.Dto.Email}", ex);
                throw;
            }

            return Unit.Value;
        }
    }
}
