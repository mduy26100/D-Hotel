using Application.Common.Interfaces.Logging;
using Application.Features.Hotels.Interfaces.Services.Command.UpdateHotel;
using MediatR;

namespace Application.Features.Hotels.Commands.UpdateHotel
{
    public class UpdateHotelCommandHandler : IRequestHandler<UpdateHotelCommand, Unit>
    {
        private readonly IUpdateHotelService _updateHotelService;
        private readonly ILoggingService<UpdateHotelCommandHandler> _logger;

        public UpdateHotelCommandHandler(
            IUpdateHotelService updateHotelService,
            ILoggingService<UpdateHotelCommandHandler> logger)
        {
            _updateHotelService = updateHotelService;
            _logger = logger;
        }

        public async Task<Unit> Handle(UpdateHotelCommand request, CancellationToken cancellationToken)
        {
            try
            {
                _logger.LogInformation($"[UpdateHotel] Starting update for HotelId: {request.dto.Id}");

                var updateRequest = new DTOs.UpsertHotelRequest
                {
                    Id = request.dto.Id,
                    Name = request.dto.Name,
                    CategoryId = request.dto.CategoryId,
                    HotelManagerId = request.dto.HotelManagerId,
                    Address = request.dto.Address,
                    Description = request.dto.Description,
                    IsActive = request.dto.IsActive,
                    ImgContent = request.ImageContent,
                    ImgFileName = request.ImageFileName,
                    ImgContentType = request.ImageContentType
                };

                await _updateHotelService.UpdateAsync(updateRequest, cancellationToken);

                _logger.LogInformation($"[UpdateHotel] Successfully updated HotelId: {request.dto.Id}");

                return Unit.Value;
            }
            catch (Exception ex)
            {
                _logger.LogError($"[UpdateHotel] Error while updating HotelId: {request.dto.Id}", ex);
                throw;
            }
        }
    }
}
