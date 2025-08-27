using Application.Features.Places.Interfaces.Services.Command.DeleteHotelLocation;
using Application.Common.Interfaces.Logging;
using MediatR;

namespace Application.Features.Places.Commands.DeleteHotelLocation
{
    public class DeleteHotelLocationCommandHandler : IRequestHandler<DeleteHotelLocationCommand, Unit>
    {
        private readonly IDeleteHotelLocationService _deleteHotelLocationService;
        private readonly ILoggingService<DeleteHotelLocationCommandHandler> _logger;

        public DeleteHotelLocationCommandHandler(
            IDeleteHotelLocationService deleteHotelLocationService,
            ILoggingService<DeleteHotelLocationCommandHandler> logger)
        {
            _deleteHotelLocationService = deleteHotelLocationService;
            _logger = logger;
        }

        public async Task<Unit> Handle(DeleteHotelLocationCommand request, CancellationToken cancellationToken)
        {
            try
            {
                _logger.LogInformation($"[DeleteHotelLocation] Deleting hotel location with data: {request.dto}");

                await _deleteHotelLocationService.DeleteAsync(request.dto, cancellationToken);

                _logger.LogInformation($"[DeleteHotelLocation] Deleted hotel location with data: {request.dto}");

                return Unit.Value;
            }
            catch (Exception ex)
            {
                _logger.LogError($"[DeleteHotelLocation] Failed to delete hotel location with data: {request.dto}", ex);
                throw;
            }
        }
    }
}
