using Application.Features.Hotels.Interfaces.Services.Command.DeleteHotelCategory;
using MediatR;

namespace Application.Features.Hotels.Commands.DeleteHotelCategory
{
    public class DeleteHotelCategoryCommandHandler : IRequestHandler<DeleteHotelCategoryCommand, Unit>
    {
        private readonly IDeleteHotelCategoryService _deleteHotelCategoryService;

        public DeleteHotelCategoryCommandHandler(IDeleteHotelCategoryService deleteHotelCategoryService)
        {
            _deleteHotelCategoryService = deleteHotelCategoryService;
        }

        public Task<Unit> Handle(DeleteHotelCategoryCommand request, CancellationToken cancellationToken)
        {
            _deleteHotelCategoryService.DeleteAsync(request.Dto, cancellationToken);
            return Unit.Task;
        }
    }
}
