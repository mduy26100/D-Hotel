using Application.Features.Purposes.DTOs;
using Application.Features.Purposes.Interfaces.Services.Query.HotelTravelPurpose.GetTravelPurposeByHotelId;
using MediatR;

namespace Application.Features.Purposes.Queries.HotelTravelPurpose.GetTravelPurposeByHotelId
{
    public class GetTravelPurposeByHotelIdHandler : IRequestHandler<GetTravelPurposeByHotelIdQuery, HotelTravelPurposeDto>
    {
        private readonly IGetTravelPurposeByHotelIdService _getTravelPurposeByHotelIdService;

        public GetTravelPurposeByHotelIdHandler(IGetTravelPurposeByHotelIdService getTravelPurposeByHotelIdService)
        {
            _getTravelPurposeByHotelIdService = getTravelPurposeByHotelIdService;
        }

        public async Task<HotelTravelPurposeDto> Handle(GetTravelPurposeByHotelIdQuery request, CancellationToken cancellationToken)
        {
            var hotelTravelPurpose = await _getTravelPurposeByHotelIdService.GetTravelPurposeByHotelIdAsync(request.hotelId, cancellationToken);
            return hotelTravelPurpose;
        }
    }
}
