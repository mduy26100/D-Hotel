using Application.Common.Interfaces.Logging;
using Application.Features.Auth.Services.Command.UpdateProfile;
using MediatR;

namespace Application.Features.Auth.Commands.UpdateProfile
{
    public class UpdateProfileCommandHandler : IRequestHandler<UpdateProfileCommand>
    {
        private readonly IUpdateProfileService _updateProfileService;
        private readonly ILoggingService<UpdateProfileCommandHandler> _logger;

        public UpdateProfileCommandHandler(
            IUpdateProfileService updateProfileService,
            ILoggingService<UpdateProfileCommandHandler> logger)
        {
            _updateProfileService = updateProfileService;
            _logger = logger;
        }

        public async Task<Unit> Handle(UpdateProfileCommand request, CancellationToken cancellationToken)
        {
            _logger.LogInformation($"[UpdateProfile] Update profile attempt for userId: {request.Dto.Id}");

            try
            {
                await _updateProfileService.UpdateProfileAsync(request.Dto, cancellationToken);
                _logger.LogInformation($"[UpdateProfile] Update profile successful for userId: {request.Dto.Id}");
            }
            catch (Exception ex)
            {
                _logger.LogError($"[UpdateProfile] Update profile failed for userId: {request.Dto.Id}", ex);
                throw;
            }

            return Unit.Value;
        }
    }
}
