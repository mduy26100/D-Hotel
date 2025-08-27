using Application.Common.Interfaces.Logging;
using Application.Features.Hotels.Interfaces.Services.Command.UpdateHotelCategory;
using MediatR;

namespace Application.Features.Hotels.Commands.UpdateHotelCategory
{
    public class UpdateHotelCategoryCommandHandler : IRequestHandler<UpdateHotelCategoryCommand, Unit>
    {
        private readonly IUpdateHotelCategoryService _updateHotelCategoryService;
        private readonly ILoggingService<UpdateHotelCategoryCommandHandler> _logger;

        public UpdateHotelCategoryCommandHandler(
            IUpdateHotelCategoryService updateHotelCategoryService,
            ILoggingService<UpdateHotelCategoryCommandHandler> logger)
        {
            _updateHotelCategoryService = updateHotelCategoryService;
            _logger = logger;
        }

        public async Task<Unit> Handle(UpdateHotelCategoryCommand request, CancellationToken cancellationToken)
        {
            try
            {
                _logger.LogInformation($"[UpdateHotelCategory] Starting update for CategoryId: {request.Dto.Id}");

                await _updateHotelCategoryService.UpdateAsync(request.Dto, cancellationToken);

                _logger.LogInformation($"[UpdateHotelCategory] Successfully updated CategoryId: {request.Dto.Id}");

                return Unit.Value;
            }
            catch (Exception ex)
            {
                _logger.LogError($"[UpdateHotelCategory] Error while updating CategoryId: {request.Dto.Id}", ex);
                throw;
            }
        }
    }
}
