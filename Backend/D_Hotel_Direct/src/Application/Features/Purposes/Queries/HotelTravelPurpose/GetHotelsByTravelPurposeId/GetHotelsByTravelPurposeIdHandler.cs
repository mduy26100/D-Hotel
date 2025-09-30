using Application.Features.Hotels.DTOs;
using Application.Features.Purposes.Interfaces.Services.Query.HotelTravelPurpose.GetHotelsByTravelPurposeId;
using MediatR;

namespace Application.Features.Purposes.Queries.HotelTravelPurpose.GetHotelsByTravelPurposeId
{
    public class GetHotelsByTravelPurposeIdHandler : IRequestHandler<GetHotelsByTravelPurposeIdQuery, IEnumerable<HotelDto>>
    {
        private readonly IGetHotelsByTravelPurposeIdService _getHotelsByTravelPurposeIdService;

        public GetHotelsByTravelPurposeIdHandler(IGetHotelsByTravelPurposeIdService getHotelsByTravelPurposeIdService)
        {
            _getHotelsByTravelPurposeIdService = getHotelsByTravelPurposeIdService;
        }

        public async Task<IEnumerable<HotelDto>> Handle(GetHotelsByTravelPurposeIdQuery request, CancellationToken cancellationToken)
        {
            var list = await _getHotelsByTravelPurposeIdService.GetHotelsByTravelPurposeIdAsync(request.travelPurposeId, cancellationToken);
            return list;
        }
    }
}
