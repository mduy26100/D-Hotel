using Application.Features.Hotels.DTOs;
using Application.Features.Hotels.Repositories;
using Application.Features.Purposes.Interfaces.Services.Query.HotelTravelPurpose.GetHotelsByTravelPurposeId;
using Application.Features.Purposes.Repositories;
using AutoMapper;

namespace Application.Features.Purposes.Services.Query.HotelTravelPurpose.GetHotelsByTravelPurposeId
{
    public class GetHotelsByTravelPurposeIdService : IGetHotelsByTravelPurposeIdService
    {
        private readonly IHotelTravelPurposeRepository _hotelTravelPurposeRepository;
        private readonly IHotelRepository _hotelRepository;
        private readonly IMapper _mapper;

        public GetHotelsByTravelPurposeIdService(IHotelTravelPurposeRepository hotelTravelPurposeRepository
            , IHotelRepository hotelRepository
            , IMapper mapper)
        {
            _hotelTravelPurposeRepository = hotelTravelPurposeRepository;
            _hotelRepository = hotelRepository;
            _mapper = mapper;
        }

        public async Task<IEnumerable<HotelDto>> GetHotelsByTravelPurposeIdAsync(int travelPurposeId, CancellationToken cancellationToken = default)
        {
            var hotelTravelPurposes = await _hotelTravelPurposeRepository.FindAsync(h => h.TravelPurposeId == travelPurposeId, cancellationToken);
            
            var hotelIds = hotelTravelPurposes.Select(h => h.HotelId).ToList();

            if (!hotelIds.Any())
                return Enumerable.Empty<HotelDto>();

            var hotels = _hotelRepository.FindAsync(h => hotelIds.Contains(h.Id), cancellationToken);

            return _mapper.Map<IEnumerable<HotelDto>>(hotels);
        }
    }
}
