using Application.Features.Purposes.DTOs;
using Application.Features.Purposes.Interfaces.Services.Query.TravelPurpose.GetAllTravelPurposes;
using MediatR;

namespace Application.Features.Purposes.Queries.TravelPurpose.GetAllTravelPurposes
{
    public class GetAllTravelPurposesHandler : IRequestHandler<GetAllTravelPurposesQuery, IEnumerable<TravelPurposeDto>>
    {
        private readonly IGetAllTravelPurposesService _getAllTravelPurposesService;

        public GetAllTravelPurposesHandler(IGetAllTravelPurposesService getAllTravelPurposesService)
        {
            _getAllTravelPurposesService = getAllTravelPurposesService;
        }

        public async Task<IEnumerable<TravelPurposeDto>> Handle(GetAllTravelPurposesQuery request, CancellationToken cancellationToken)
        {
            var list = await _getAllTravelPurposesService.GetAllAsync(cancellationToken);
            return list;
        }
    }
}
