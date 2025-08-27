using Application.Features.Places.DTOs;
using Application.Features.Places.Interfaces.Services.Query.GetAllLocations;
using MediatR;

namespace Application.Features.Places.Queries.GetAllLocations
{
    public class GetAllLocationsQueryHandler : IRequestHandler<GetAllLocationsQuery, IEnumerable<LocationsDto>>
    {
        private readonly IGetAllLocationsService _getAllLocationsService;

        public GetAllLocationsQueryHandler(IGetAllLocationsService getAllLocationsService)
        {
            _getAllLocationsService = getAllLocationsService;
        }

        public async Task<IEnumerable<LocationsDto>> Handle(GetAllLocationsQuery request, CancellationToken cancellationToken)
        {
            return await _getAllLocationsService.GetAllAsync(cancellationToken);
        }
    }
}
