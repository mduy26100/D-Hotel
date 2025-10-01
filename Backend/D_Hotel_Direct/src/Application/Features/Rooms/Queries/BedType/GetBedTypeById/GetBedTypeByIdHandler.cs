using Application.Features.Rooms.DTOs;
using Application.Features.Rooms.Interfaces.Services.Query.BedType.GetBedTypeById;
using MediatR;

namespace Application.Features.Rooms.Queries.BedType.GetBedTypeById
{
    public class GetBedTypeByIdHandler : IRequestHandler<GetBedTypeByIdQuery, BedTypeDto>
    {
        private readonly IGetBedTypeByIdService _getBedTypeByIdService;

        public GetBedTypeByIdHandler(IGetBedTypeByIdService getBedTypeByIdService)
        {
            _getBedTypeByIdService = getBedTypeByIdService;
        }

        public async Task<BedTypeDto> Handle(GetBedTypeByIdQuery request, CancellationToken cancellationToken)
        {
            return await _getBedTypeByIdService.GetByIdAsync(request.id, cancellationToken);
        }
    }
}
