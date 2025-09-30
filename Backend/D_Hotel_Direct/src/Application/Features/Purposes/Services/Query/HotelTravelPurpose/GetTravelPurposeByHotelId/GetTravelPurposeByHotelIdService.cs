using Application.Features.Purposes.DTOs;
using Application.Features.Purposes.Interfaces.Services.Query.HotelTravelPurpose.GetTravelPurposeByHotelId;
using Application.Features.Purposes.Repositories;
using AutoMapper;

namespace Application.Features.Purposes.Services.Query.HotelTravelPurpose.GetTravelPurposeByHotelId
{
    public class GetTravelPurposeByHotelIdService : IGetTravelPurposeByHotelIdService
    {
        private readonly IHotelTravelPurposeRepository _hotelTravelPurposeRepository;
        private readonly IMapper _mapper;

        public GetTravelPurposeByHotelIdService(IHotelTravelPurposeRepository hotelTravelPurposeRepository
            , IMapper mapper)
        {
            _hotelTravelPurposeRepository = hotelTravelPurposeRepository;
            _mapper = mapper;
        }

        public async Task<TravelPurposeDto> GetTravelPurposeByHotelIdAsync(int hotelId, CancellationToken cancellationToken = default)
        {
            var travelPurpose = await _hotelTravelPurposeRepository.FindAsync(h => h.HotelId == hotelId, cancellationToken);
            return _mapper.Map<TravelPurposeDto>(travelPurpose);
        }
    }
}
