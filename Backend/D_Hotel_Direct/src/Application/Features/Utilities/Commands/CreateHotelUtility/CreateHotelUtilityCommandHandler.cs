using Application.Features.Utilities.DTOs;
using Application.Features.Utilities.Interfaces.Services.Command.CreateHotelUtility;
using Application.Common.Interfaces.Logging;
using MediatR;

namespace Application.Features.Utilities.Commands.CreateHotelUtility
{
    public class CreateHotelUtilityCommandHandler : IRequestHandler<CreateHotelUtilityCommand, HotelUtilityDto>
    {
        private readonly ICreateHotelUtilityService _createHotelUtilityService;
        private readonly ILoggingService<CreateHotelUtilityCommandHandler> _logger;

        public CreateHotelUtilityCommandHandler(
            ICreateHotelUtilityService createHotelUtilityService,
            ILoggingService<CreateHotelUtilityCommandHandler> logger)
        {
            _createHotelUtilityService = createHotelUtilityService;
            _logger = logger;
        }

        public async Task<HotelUtilityDto> Handle(CreateHotelUtilityCommand request, CancellationToken cancellationToken)
        {
            try
            {
                _logger.LogInformation($"[CreateHotelUtility] Start creating hotel utility for HotelId: {request.hotelId}");

                var parsedUtilityIds = request.utilityId
                    .Split(',', StringSplitOptions.RemoveEmptyEntries)
                    .Select(id => int.TryParse(id.Trim(), out var val) ? val : throw new FormatException("Invalid utility ID"))
                    .Distinct()
                    .ToList();

                var dto = new HotelUtilityDto
                {
                    HotelId = request.hotelId,
                    UtilityIds = parsedUtilityIds
                };

                var result = await _createHotelUtilityService.CreateAsync(dto, cancellationToken);

                _logger.LogInformation($"[CreateHotelUtility] Successfully created hotel utility for HotelId: {request.hotelId}");

                return result;
            }
            catch (Exception ex)
            {
                _logger.LogError($"[CreateHotelUtility] Error creating hotel utility for HotelId: {request.hotelId}", ex);
                throw;
            }
        }
    }
}