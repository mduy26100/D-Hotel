using Application.Features.Places.DTOs;
using Application.Features.Places.Interfaces.Services.Command.CreateHotelLocation;
using Application.Common.Interfaces.Logging;
using MediatR;

namespace Application.Features.Places.Commands.CreateHotelLocation
{
    public class CreateHotelLocationCommandHandler
        : IRequestHandler<CreateHotelLocationCommand, HotelLocationsDto>
    {
        private readonly ICreateHotelLocationService _createHotelLocationService;
        private readonly ILoggingService<CreateHotelLocationCommandHandler> _logger;

        public CreateHotelLocationCommandHandler(
            ICreateHotelLocationService createHotelLocationService,
            ILoggingService<CreateHotelLocationCommandHandler> logger)
        {
            _createHotelLocationService = createHotelLocationService;
            _logger = logger;
        }

        public async Task<HotelLocationsDto> Handle(CreateHotelLocationCommand request, CancellationToken cancellationToken)
        {
            try
            {
                _logger.LogInformation($"[CreateHotelLocation] Creating HotelLocation with data: {System.Text.Json.JsonSerializer.Serialize(request.dto)}");

                var result = await _createHotelLocationService.CreateAsync(request.dto, cancellationToken);

                _logger.LogInformation($"[CreateHotelLocation] HotelLocation created with LocationId: {result.LocationId}");

                return result;
            }
            catch (Exception ex)
            {
                _logger.LogError("[CreateHotelLocation] Failed to create HotelLocation", ex);
                throw;
            }
        }
    }
}
