using Application.Features.Places.DTOs;
using Application.Features.Places.Interfaces.Services.Query.GetHotelLocationByHotelId;
using MediatR;

namespace Application.Features.Places.Queries.GetHotelLocationByHotelId
{
    public class GetHotelLocationByHotelIdQueryHandler : IRequestHandler<GetHotelLocationByHotelIdQuery, HotelLocationsDto>
    {
        private readonly IGetHotelLocationByHotelIdService _getHotelLocationByHotelIdService;

        public GetHotelLocationByHotelIdQueryHandler(IGetHotelLocationByHotelIdService getHotelLocationByHotelIdService)
        {
            _getHotelLocationByHotelIdService = getHotelLocationByHotelIdService;
        }

        public async Task<HotelLocationsDto> Handle(GetHotelLocationByHotelIdQuery request, CancellationToken cancellationToken)
        {
            return await _getHotelLocationByHotelIdService.GetByHotelIdAsync(request.hotelId, cancellationToken);
        }
    }
}
