using Application.Features.Places.DTOs;
using Application.Features.Places.Interfaces.Services.Query.GetAllHotelLocations;
using MediatR;

namespace Application.Features.Places.Queries.GetAllHotelLocations
{
    public class GetAllHotelLocationsQueryHandler : IRequestHandler<GetAllHotelLocationsQuery, IEnumerable<HotelLocationsDto>>
    {
        public readonly IGetAllHotelLocationsService _getAllHotelLocationsService;

        public GetAllHotelLocationsQueryHandler(IGetAllHotelLocationsService getAllHotelLocationsService)
        {
            _getAllHotelLocationsService = getAllHotelLocationsService;
        }

        public async Task<IEnumerable<HotelLocationsDto>> Handle(GetAllHotelLocationsQuery request, CancellationToken cancellationToken)
        {
            return await _getAllHotelLocationsService.GetAllAsync(cancellationToken);
        }
    }
}
