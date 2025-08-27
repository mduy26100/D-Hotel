using Application.Features.Utilities.DTOs;
using Application.Features.Utilities.Interfaces.Services.Command.DeleteHotelUtility;
using Application.Common.Interfaces.Logging;
using MediatR;

namespace Application.Features.Utilities.Commands.DeleteHotelUtility
{
    public class DeleteHotelUtilityCommandHandler : IRequestHandler<DeleteHotelUtilityCommand, Unit>
    {
        private readonly IDeleteHotelUtilityService _deleteHotelUtilityService;
        private readonly ILoggingService<DeleteHotelUtilityCommandHandler> _logger;

        public DeleteHotelUtilityCommandHandler(
            IDeleteHotelUtilityService deleteHotelUtilityService,
            ILoggingService<DeleteHotelUtilityCommandHandler> logger)
        {
            _deleteHotelUtilityService = deleteHotelUtilityService;
            _logger = logger;
        }

        public async Task<Unit> Handle(DeleteHotelUtilityCommand request, CancellationToken cancellationToken)
        {
            try
            {
                _logger.LogInformation($"[DeleteHotelUtility] Start deleting hotel utility for HotelId: {request.hotelId}");

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

                await _deleteHotelUtilityService.DeleteAsync(dto, cancellationToken);

                _logger.LogInformation($"[DeleteHotelUtility] Successfully deleted hotel utility for HotelId: {request.hotelId}");

                return Unit.Value;
            }
            catch (Exception ex)
            {
                _logger.LogError($"[DeleteHotelUtility] Error deleting hotel utility for HotelId: {request.hotelId}", ex);
                throw;
            }
        }
    }
}