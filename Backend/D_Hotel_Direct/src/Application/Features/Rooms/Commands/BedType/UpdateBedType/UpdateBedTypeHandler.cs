using Application.Features.Rooms.Interfaces.Services.Command.BedType.UpdateBedType;
using MediatR;

namespace Application.Features.Rooms.Commands.BedType.UpdateBedType
{
    public class UpdateBedTypeHandler : IRequestHandler<UpdateBedTypeCommand, Unit>
    {
        private readonly IUpdateBedTypeService _updateBedTypeService;

        public UpdateBedTypeHandler(IUpdateBedTypeService updateBedTypeService)
        {
            _updateBedTypeService = updateBedTypeService;
        }

        public async Task<Unit> Handle(UpdateBedTypeCommand request, CancellationToken cancellationToken)
        {
            await _updateBedTypeService.UpdateAsync(request.dto, cancellationToken);
            return Unit.Value;
        }
    }
}
