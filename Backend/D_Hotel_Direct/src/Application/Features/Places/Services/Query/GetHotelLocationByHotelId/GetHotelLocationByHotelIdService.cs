using Application.Features.Places.DTOs;
using Application.Features.Places.Interfaces.Services.Query.GetHotelLocationByHotelId;
using Application.Features.Places.Repositories;
using AutoMapper;

namespace Application.Features.Places.Services.Query.GetHotelLocationByHotelId
{
    public class GetHotelLocationByHotelIdService : IGetHotelLocationByHotelIdService
    {
        private readonly IHotelLocationsRepository _hotelLocationsRepository;
        private readonly IMapper _mapper;

        public GetHotelLocationByHotelIdService(IHotelLocationsRepository hotelLocationsRepository
            , IMapper mapper)
        {
            _hotelLocationsRepository = hotelLocationsRepository;
            _mapper = mapper;
        }

        public async Task<HotelLocationsDto> GetByHotelIdAsync(int hotelId, CancellationToken cancellationToken = default)
        {
            var entity = await _hotelLocationsRepository.FindOneAsync(h => h.HotelId == hotelId, cancellationToken);
            return _mapper.Map<HotelLocationsDto>(entity);
        }
    }
}
