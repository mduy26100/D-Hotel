using Application.Features.Places.Interfaces.Services.Command.UpdateHotelLocation;
using Application.Common.Interfaces.Logging;
using MediatR;

namespace Application.Features.Places.Commands.UpdateHotelLocation
{
    public class UpdateHotelLocationCommandHandler : IRequestHandler<UpdateHotelLocationCommand, Unit>
    {
        private readonly IUpdateHotelLocationService _updateHotelLocationService;
        private readonly ILoggingService<UpdateHotelLocationCommandHandler> _logger;

        public UpdateHotelLocationCommandHandler(
            IUpdateHotelLocationService updateHotelLocationService,
            ILoggingService<UpdateHotelLocationCommandHandler> logger)
        {
            _updateHotelLocationService = updateHotelLocationService;
            _logger = logger;
        }

        public async Task<Unit> Handle(UpdateHotelLocationCommand request, CancellationToken cancellationToken)
        {
            try
            {
                _logger.LogInformation($"[UpdateHotelLocation] Start updating HotelLocation with HotelId: {request.dto.HotelId}");

                await _updateHotelLocationService.UpdateAsync(request.dto, cancellationToken);

                _logger.LogInformation($"[UpdateHotelLocation] HotelLocation updated successfully. HotelId: {request.dto.HotelId}");
                return Unit.Value;
            }
            catch (Exception ex)
            {
                _logger.LogError($"[UpdateHotelLocation] Error while updating HotelLocation HotelId: {request.dto.HotelId}", ex);
                throw;
            }
        }
    }
}
