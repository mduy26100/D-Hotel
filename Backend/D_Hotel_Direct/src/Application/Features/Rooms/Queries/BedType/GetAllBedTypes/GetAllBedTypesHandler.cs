using Application.Features.Rooms.DTOs;
using Application.Features.Rooms.Interfaces.Services.Query.BedType.GetAllBedTypes;
using MediatR;

namespace Application.Features.Rooms.Queries.BedType.GetAllBedTypes
{
    public class GetAllBedTypesHandler : IRequestHandler<GetAllBedTypesQuery, IEnumerable<BedTypeDto>>
    {
        private readonly IGetAllBedTypesService _getAllBedTypesService;

        public GetAllBedTypesHandler(IGetAllBedTypesService getAllBedTypesService)
        {
            _getAllBedTypesService = getAllBedTypesService;
        }

        public async Task<IEnumerable<BedTypeDto>> Handle(GetAllBedTypesQuery request, CancellationToken cancellationToken)
        {
            return await _getAllBedTypesService.GetAllAsync(cancellationToken);
        }
    }
}
