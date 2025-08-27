using Application.Features.Hotels.Interfaces.Services.Command.UpdateHotelCategory;
using MediatR;

namespace Application.Features.Hotels.Commands.UpdateHotelCategory
{
    public class UpdateHotelCategoryCommandHandler : IRequestHandler<UpdateHotelCategoryCommand, Unit>
    {
        private readonly IUpdateHotelCategoryService _updateHotelCategoryService;

        public UpdateHotelCategoryCommandHandler(IUpdateHotelCategoryService updateHotelCategoryService)
        {
            _updateHotelCategoryService = updateHotelCategoryService;
        }

        public Task<Unit> Handle(UpdateHotelCategoryCommand request, CancellationToken cancellationToken)
        {
            _updateHotelCategoryService.UpdateAsync(request.Dto, cancellationToken);
            return Unit.Task;
        }
    }
}
