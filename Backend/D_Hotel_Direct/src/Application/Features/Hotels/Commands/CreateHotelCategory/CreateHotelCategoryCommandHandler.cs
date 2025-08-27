using Application.Common.Interfaces.Logging;
using Application.Features.Hotels.DTOs;
using Application.Features.Hotels.Interfaces.Services.Command.CreateHotelCategory;
using MediatR;

namespace Application.Features.Hotels.Commands.CreateHotelCategory
{
    public class CreateHotelCategoryCommandHandler : IRequestHandler<CreateHotelCategoryCommand, HotelCategoryDto>
    {
        private readonly ICreateHotelCategoryService _createHotelCategoryService;
        private readonly ILoggingService<CreateHotelCategoryCommandHandler> _logger;

        public CreateHotelCategoryCommandHandler(
            ICreateHotelCategoryService createHotelCategoryService,
            ILoggingService<CreateHotelCategoryCommandHandler> logger)
        {
            _createHotelCategoryService = createHotelCategoryService;
            _logger = logger;
        }

        public async Task<HotelCategoryDto> Handle(CreateHotelCategoryCommand request, CancellationToken cancellationToken)
        {
            try
            {
                _logger.LogInformation($"[CreateHotelCategory] Start creating hotel type: {request.Dto.Name}");

                var result = await _createHotelCategoryService.CreateAsync(request.Dto, cancellationToken);

                _logger.LogInformation($"[CreateHotelCategory] Hotel category created successfully. CategoryId: {result.Id}");

                return result;
            }
            catch (Exception ex)
            {
                _logger.LogError($"[CreateHotelCategory] Error creating hotel type {request.Dto.Name}", ex);
                throw;
            }
        }
    }
}
