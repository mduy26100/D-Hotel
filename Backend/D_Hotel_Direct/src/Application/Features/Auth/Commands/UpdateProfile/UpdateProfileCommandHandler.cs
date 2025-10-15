using Application.Common.Interfaces.Logging;
using Application.Features.Auth.Services.Command.UpdateProfile;
using MediatR;

namespace Application.Features.Auth.Commands.UpdateProfile
{
    public class UpdateProfileCommandHandler : IRequestHandler<UpdateProfileCommand>
    {
        private readonly IUpdateProfileService _updateProfileService;
        private readonly ILoggingService<UpdateProfileCommandHandler> _logger;
        private readonly ICurrentUserContext _currentUserContext;


        public UpdateProfileCommandHandler(
            IUpdateProfileService updateProfileService,
            ILoggingService<UpdateProfileCommandHandler> logger,
            ICurrentUserContext currentUserContext)
        {
            _updateProfileService = updateProfileService;
            _logger = logger;
            _currentUserContext = currentUserContext;
        }

        public async Task<Unit> Handle(UpdateProfileCommand request, CancellationToken cancellationToken)
        {
            _logger.LogInformation($"[UpdateProfile] Update profile attempt for userId: {request.Dto.Id}");

            try
            {
                request.Dto.Id = _currentUserContext.UserId;
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
