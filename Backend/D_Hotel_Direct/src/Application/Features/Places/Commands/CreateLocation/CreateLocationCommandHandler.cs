using Application.Features.Places.DTOs;
using Application.Features.Places.Interfaces.Services.Command.CreateLocation;
using MediatR;

namespace Application.Features.Places.Commands.CreateLocation
{
    public class CreateLocationCommandHandler : IRequestHandler<CreateLocationCommand, LocationsDto>
    {
        private readonly ICreateLocationService _createLocationService;

        public CreateLocationCommandHandler(ICreateLocationService createLocationService)
        {
            _createLocationService = createLocationService;
        }

        public async Task<LocationsDto> Handle(CreateLocationCommand request, CancellationToken cancellationToken)
        {
            var dto = new UpsertLocationRequest
            {
                Name = request.name,
                ImageContent = request.ImageContent,
                ImageFileName = request.ImageFileName,
                ImageContentType = request.ImageContentType
            };

            return await _createLocationService.CreateAsync(dto, cancellationToken);
        }
    }
}
