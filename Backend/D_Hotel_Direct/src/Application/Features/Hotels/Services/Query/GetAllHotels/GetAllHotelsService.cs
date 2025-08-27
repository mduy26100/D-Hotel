using Application.Features.Hotels.DTOs;
using Application.Features.Hotels.Interfaces.Services.Query.GetAllHotels;
using Application.Features.Hotels.Repositories;
using AutoMapper;

namespace Application.Features.Hotels.Services.Query.GetAllHotels
{
    public class GetAllHotelsService : IGetAllHotelsService
    {
        private readonly IHotelRepository _hotelRepository;
        private readonly IMapper _mapper;

        public GetAllHotelsService(IHotelRepository hotelRepository
            , IMapper mapper)
        {
            _hotelRepository = hotelRepository;
            _mapper = mapper;
        }

        public async Task<IEnumerable<HotelDto>> GetAllAsync(CancellationToken cancellationToken = default)
        {
            var hotels = await _hotelRepository.GetAllAsync(cancellationToken);
            return _mapper.Map<IEnumerable<HotelDto>>(hotels);
        }
    }
}
