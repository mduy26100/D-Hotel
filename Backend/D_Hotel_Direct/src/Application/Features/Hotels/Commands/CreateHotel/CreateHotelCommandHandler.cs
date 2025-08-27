using Application.Common.Interfaces.Logging;
using Application.Features.Hotels.DTOs;
using Application.Features.Hotels.Interfaces.Services.Command.CreateHotel;
using MediatR;

namespace Application.Features.Hotels.Commands.CreateHotel
{
    public class CreateHotelCommandHandler : IRequestHandler<CreateHotelCommand, HotelDto>
    {
        private readonly ICreateHotelService _createHotelService;
        private readonly ILoggingService<CreateHotelCommandHandler> _logger;

        public CreateHotelCommandHandler(
            ICreateHotelService createHotelService,
            ILoggingService<CreateHotelCommandHandler> logger)
        {
            _createHotelService = createHotelService;
            _logger = logger;
        }

        public async Task<HotelDto> Handle(CreateHotelCommand request, CancellationToken cancellationToken)
        {
            try
            {
                _logger.LogInformation($"[CreateHotel] Start creating a hotel: {request.dto.Name}");

                var dto = new UpsertHotelRequest
                {
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

                var result = await _createHotelService.CreateAsync(dto, cancellationToken);

                _logger.LogInformation($"[CreateHotel] Hotel created successfully. HotelId: {result.Id}");

                return result;
            }
            catch (Exception ex)
            {
                _logger.LogError($"[CreateHotel] Error creating hotel {request.dto.Name}", ex);
                throw;
            }
        }
    }
}
