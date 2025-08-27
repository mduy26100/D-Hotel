using Application.Common.Interfaces.Logging;
using Application.Features.Hotels.Interfaces.Services.Command.DeleteHotel;
using MediatR;

namespace Application.Features.Hotels.Commands.DeleteHotel
{
    public class DeleteHotelCommandHandler : IRequestHandler<DeleteHotelCommand, Unit>
    {
        private readonly IDeleteHotelService _deleteHotelService;
        private readonly ILoggingService<DeleteHotelCommandHandler> _logger;

        public DeleteHotelCommandHandler(
            IDeleteHotelService deleteHotelService,
            ILoggingService<DeleteHotelCommandHandler> logger)
        {
            _deleteHotelService = deleteHotelService;
            _logger = logger;
        }

        public async Task<Unit> Handle(DeleteHotelCommand request, CancellationToken cancellationToken)
        {
            try
            {
                _logger.LogInformation($"[DeleteHotel] Start deleting hotel with Id: {request.Dto.Id}");

                await _deleteHotelService.DeleteAsync(request.Dto, cancellationToken);

                _logger.LogInformation($"[DeleteHotel] Hotel deleted successfully. HotelId: {request.Dto.Id}");

                return Unit.Value;
            }
            catch (Exception ex)
            {
                _logger.LogError($"[DeleteHotel] Error while deleting hotel Id: {request.Dto.Id}", ex);
                throw;
            }
        }
    }
}
