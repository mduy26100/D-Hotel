using Application.Features.Places.DTOs;
using Application.Features.Places.Interfaces.Services.Command.CreateLocation;
using Application.Common.Interfaces.Logging;
using MediatR;

namespace Application.Features.Places.Commands.CreateLocation
{
    public class CreateLocationCommandHandler : IRequestHandler<CreateLocationCommand, LocationsDto>
    {
        private readonly ICreateLocationService _createLocationService;
        private readonly ILoggingService<CreateLocationCommandHandler> _logger;

        public CreateLocationCommandHandler(
            ICreateLocationService createLocationService,
            ILoggingService<CreateLocationCommandHandler> logger)
        {
            _createLocationService = createLocationService;
            _logger = logger;
        }

        public async Task<LocationsDto> Handle(CreateLocationCommand request, CancellationToken cancellationToken)
        {
            try
            {
                _logger.LogInformation($"[CreateLocation] Starting creation of Location with Name: {request.name}");

                var dto = new UpsertLocationRequest
                {
                    Name = request.name,
                    ImageContent = request.ImageContent,
                    ImageFileName = request.ImageFileName,
                    ImageContentType = request.ImageContentType
                };

                var result = await _createLocationService.CreateAsync(dto, cancellationToken);

                _logger.LogInformation($"[CreateLocation] Successfully created Location with Id: {result.Id}, Name: {result.Name}");

                return result;
            }
            catch (Exception ex)
            {
                _logger.LogError($"[CreateLocation] Error while creating Location with Name: {request.name}", ex);
                throw;
            }
        }
    }
}
