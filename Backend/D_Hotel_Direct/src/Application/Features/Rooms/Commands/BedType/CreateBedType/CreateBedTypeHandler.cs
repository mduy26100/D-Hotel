using Application.Features.Rooms.DTOs;
using Application.Features.Rooms.Interfaces.Services.Command.BedType.CreateBedType;
using MediatR;

namespace Application.Features.Rooms.Commands.BedType.CreateBedType
{
    public class CreateBedTypeHandler : IRequestHandler<CreateBedTypeCommand, BedTypeDto>
    {
        private readonly ICreateBedTypeService _createBedTypeService;

        public CreateBedTypeHandler(ICreateBedTypeService createBedTypeService)
        {
            _createBedTypeService = createBedTypeService;
        }

        public async Task<BedTypeDto> Handle(CreateBedTypeCommand request, CancellationToken cancellationToken)
        {
            return await _createBedTypeService.CreateAsync(request.dto, cancellationToken);
        }
    }
}
