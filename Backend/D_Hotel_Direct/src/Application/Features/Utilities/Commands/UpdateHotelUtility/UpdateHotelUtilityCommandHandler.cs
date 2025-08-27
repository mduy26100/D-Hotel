using Application.Features.Utilities.DTOs;
using Application.Features.Utilities.Interfaces.Services.Command.UpdateHotelUtility;
using Application.Common.Interfaces.Logging;
using MediatR;

namespace Application.Features.Utilities.Commands.UpdateHotelUtility
{
    public class UpdateHotelUtilityCommandHandler : IRequestHandler<UpdateHotelUtilityCommand, Unit>
    {
        private readonly IUpdateHotelUtilityService _updateHotelUtilityService;
        private readonly ILoggingService<UpdateHotelUtilityCommandHandler> _logger;

        public UpdateHotelUtilityCommandHandler(
            IUpdateHotelUtilityService updateHotelUtilityService,
            ILoggingService<UpdateHotelUtilityCommandHandler> logger)
        {
            _updateHotelUtilityService = updateHotelUtilityService;
            _logger = logger;
        }

        public async Task<Unit> Handle(UpdateHotelUtilityCommand request, CancellationToken cancellationToken)
        {
            try
            {
                _logger.LogInformation($"[UpdateHotelUtility] Start updating hotel utility for HotelId: {request.hotelId}");

                var parsedUtilityIds = request.utilityIds
                    .Split(',', StringSplitOptions.RemoveEmptyEntries)
                    .Select(id => int.TryParse(id.Trim(), out var val) ? val : throw new FormatException("Invalid utility ID"))
                    .Distinct()
                    .ToList();

                var dto = new HotelUtilityDto
                {
                    HotelId = request.hotelId,
                    UtilityIds = parsedUtilityIds
                };

                await _updateHotelUtilityService.UpdateAsync(dto, cancellationToken);

                _logger.LogInformation($"[UpdateHotelUtility] Successfully updated hotel utility for HotelId: {request.hotelId}");

                return Unit.Value;
            }
            catch (Exception ex)
            {
                _logger.LogError($"[UpdateHotelUtility] Error updating hotel utility for HotelId: {request.hotelId}", ex);
                throw;
            }
        }
    }
}