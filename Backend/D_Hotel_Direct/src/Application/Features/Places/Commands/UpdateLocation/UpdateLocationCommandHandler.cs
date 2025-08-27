using Application.Features.Places.DTOs;
using Application.Features.Places.Interfaces.Services.Command.UpdateLocation;
using MediatR;

namespace Application.Features.Places.Commands.UpdateLocation
{
    public class UpdateLocationCommandHandler : IRequestHandler<UpdateLocationCommand, Unit>
    {
        private readonly IUpdateLocationService _updateLocationService;

        public UpdateLocationCommandHandler(IUpdateLocationService updateLocationService)
        {
            _updateLocationService = updateLocationService;
        }

        public async Task<Unit> Handle(UpdateLocationCommand request, CancellationToken cancellationToken)
        {
            var updateRequest = new UpsertLocationRequest
            {
                Id = request.dto.Id,
                Name = request.dto.Name,
                ImageContent = request.ImageContent,
                ImageFileName = request.ImageFileName,
                ImageContentType = request.ImageContentType
            };

            await _updateLocationService.UpdateAsync(updateRequest, cancellationToken);

            return Unit.Value;
        }
    }
}
