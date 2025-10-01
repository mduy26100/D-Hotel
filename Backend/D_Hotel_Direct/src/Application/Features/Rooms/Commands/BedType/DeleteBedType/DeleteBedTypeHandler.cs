using Application.Features.Rooms.Interfaces.Services.Command.BedType.DeleteBedType;
using MediatR;

namespace Application.Features.Rooms.Commands.BedType.DeleteBedType
{
    public class DeleteBedTypeHandler : IRequestHandler<DeleteBedTypeCommand, Unit>
    {
        private readonly IDeleteBedTypeService _deleteBedTypeService;

        public DeleteBedTypeHandler(IDeleteBedTypeService deleteBedTypeService)
        {
            _deleteBedTypeService = deleteBedTypeService;
        }

        public async Task<Unit> Handle(DeleteBedTypeCommand request, CancellationToken cancellationToken)
        {
            await _deleteBedTypeService.DeleteAsync(request.dto, cancellationToken);
            return Unit.Value;
        }
    }
}
