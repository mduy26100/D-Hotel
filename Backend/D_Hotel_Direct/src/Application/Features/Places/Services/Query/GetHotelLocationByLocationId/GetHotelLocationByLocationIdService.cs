using Application.Features.Places.DTOs;
using Application.Features.Places.Interfaces.Services.Query.GetHotelLocationByLocationId;
using Application.Features.Places.Repositories;
using AutoMapper;

namespace Application.Features.Places.Services.Query.GetHotelLocationByLocationId
{
    public class GetHotelLocationByLocationIdService : IGetHotelLocationByLocationIdService
    {
        private readonly IHotelLocationsRepository _hotelLocationsRepository;
        private readonly IMapper _mapper;

        public GetHotelLocationByLocationIdService(IHotelLocationsRepository hotelLocationsRepository
            , IMapper mapper)
        {
            _hotelLocationsRepository = hotelLocationsRepository;
            _mapper = mapper;
        }

        public async Task<IEnumerable<HotelLocationsDto>> GetByLocationIdAsync(int locationId, CancellationToken cancellationToken = default)
        {
            var entities = await _hotelLocationsRepository.GetByLocationIdAsync(locationId, cancellationToken);
            return _mapper.Map<IEnumerable<HotelLocationsDto>>(entities);
        }
    }
}
