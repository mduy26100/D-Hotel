using Application.Features.Utilities.DTOs;
using Application.Features.Utilities.Interfaces.Services.Command.UpdateUtility;
using MediatR;

namespace Application.Features.Utilities.Commands.UpdateUtility
{
    public class UpdateUtilityCommandHandler : IRequestHandler<UpdateUtilityCommand, Unit>
    {
        private readonly IUpdateUtilityService _updateUtilityService;

        public UpdateUtilityCommandHandler(IUpdateUtilityService updateUtilityService)
        {
            _updateUtilityService = updateUtilityService;
        }

        public async Task<Unit> Handle(UpdateUtilityCommand request, CancellationToken cancellationToken)
        {
            var updateRequest = new UpsertUtilityRequest
            {
                Id = request.Dto.Id,
                Name = request.Dto.Name,
                ImageContent = request.ImageContent,
                ImageFileName = request.ImageFileName,
                ImageContentType = request.ImageContentType
            };

            await _updateUtilityService.UpdateAsync(updateRequest, cancellationToken);
            return Unit.Value;
        }
    }
}
