using Application.Common.Interfaces.Logging;
using Application.Features.Hotels.Interfaces.Services.Command.DeleteHotelCategory;
using MediatR;

namespace Application.Features.Hotels.Commands.DeleteHotelCategory
{
    public class DeleteHotelCategoryCommandHandler : IRequestHandler<DeleteHotelCategoryCommand, Unit>
    {
        private readonly IDeleteHotelCategoryService _deleteHotelCategoryService;
        private readonly ILoggingService<DeleteHotelCategoryCommandHandler> _logger;

        public DeleteHotelCategoryCommandHandler(
            IDeleteHotelCategoryService deleteHotelCategoryService,
            ILoggingService<DeleteHotelCategoryCommandHandler> logger)
        {
            _deleteHotelCategoryService = deleteHotelCategoryService;
            _logger = logger;
        }

        public async Task<Unit> Handle(DeleteHotelCategoryCommand request, CancellationToken cancellationToken)
        {
            try
            {
                _logger.LogInformation($"[DeleteHotelCategory] Start deleting hotel type Id: {request.Dto.Id}");

                await _deleteHotelCategoryService.DeleteAsync(request.Dto, cancellationToken);

                _logger.LogInformation($"[DeleteHotelCategory] Hotel category deleted successfully. CategoryId: {request.Dto.Id}");

                return Unit.Value;
            }
            catch (Exception ex)
            {
                _logger.LogError($"[DeleteHotelCategory] Error while deleting hotel type Id: {request.Dto.Id}", ex);
                throw;
            }
        }
    }
}
