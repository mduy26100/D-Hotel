using Application.Features.Places.DTOs;
using Application.Features.Places.Interfaces.Services.Query.GetHotelLocationByLocationId;
using MediatR;

namespace Application.Features.Places.Queries.GetHotelLocationByLocationId
{
    public class GetHotelLocationByLocationIdQueryHandler : IRequestHandler<GetHotelLocationByLocationIdQuery, IEnumerable<HotelLocationsDto>>
    {
        private readonly IGetHotelLocationByLocationIdService _getHotelLocationByLocationIdService;

        public GetHotelLocationByLocationIdQueryHandler(IGetHotelLocationByLocationIdService getHotelLocationByLocationIdService)
        {
            _getHotelLocationByLocationIdService = getHotelLocationByLocationIdService;
        }

        public async Task<IEnumerable<HotelLocationsDto>> Handle(GetHotelLocationByLocationIdQuery request, CancellationToken cancellationToken)
        {
            return await _getHotelLocationByLocationIdService.GetByLocationIdAsync(request.locationId, cancellationToken);
        }
    }
}
