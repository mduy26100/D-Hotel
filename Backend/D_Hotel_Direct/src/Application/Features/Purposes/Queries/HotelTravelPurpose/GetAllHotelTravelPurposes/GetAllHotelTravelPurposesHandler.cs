using Application.Features.Purposes.DTOs;
using Application.Features.Purposes.Interfaces.Services.Query.HotelTravelPurpose.GetAllHotelTravelPurposes;
using MediatR;

namespace Application.Features.Purposes.Queries.HotelTravelPurpose.GetAllHotelTravelPurposes
{
    public class GetAllHotelTravelPurposesHandler : IRequestHandler<GetAllHotelTravelPurposesQuery, IEnumerable<HotelTravelPurposeDto>>
    {
        private readonly IGetAllHotelTravelPurposesService _getAllHotelTravelPurposesService;

        public GetAllHotelTravelPurposesHandler(IGetAllHotelTravelPurposesService getAllHotelTravelPurposesService)
        {
            _getAllHotelTravelPurposesService = getAllHotelTravelPurposesService;
        }

        public Task<IEnumerable<HotelTravelPurposeDto>> Handle(GetAllHotelTravelPurposesQuery request, CancellationToken cancellationToken)
        {
            var list = _getAllHotelTravelPurposesService.GetAllAsync(cancellationToken);
            return list;
        }
    }
}
