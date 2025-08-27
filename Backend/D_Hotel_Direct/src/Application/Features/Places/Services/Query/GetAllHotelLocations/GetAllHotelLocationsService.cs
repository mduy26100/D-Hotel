using Application.Features.Places.DTOs;
using Application.Features.Places.Interfaces.Services.Query.GetAllHotelLocations;
using Application.Features.Places.Repositories;
using AutoMapper;

namespace Application.Features.Places.Services.Query.GetAllHotelLocations
{
    public class GetAllHotelLocationsService : IGetAllHotelLocationsService
    {
        private readonly IHotelLocationsRepository _hotelLocationsRepository;
        private readonly IMapper _mapper;

        public GetAllHotelLocationsService(IHotelLocationsRepository hotelLocationsRepository
            , IMapper mapper)
        {
            _hotelLocationsRepository = hotelLocationsRepository;
            _mapper = mapper;
        }

        public async Task<IEnumerable<HotelLocationsDto>> GetAllAsync(CancellationToken cancellationToken = default)
        {
            var entities = await _hotelLocationsRepository.GetAllAsync(cancellationToken);
            return _mapper.Map<IEnumerable<HotelLocationsDto>>(entities);
        }
    }
}
