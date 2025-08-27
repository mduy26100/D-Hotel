using Application.Features.Hotels.DTOs;
using Application.Features.Hotels.Interfaces.Services.Query.GetHotelById;
using Application.Features.Hotels.Repositories;
using AutoMapper;

namespace Application.Features.Hotels.Services.Query.GetHotelById
{
    public class GetHotelByIdService : IGetHotelByIdService
    {
        private readonly IHotelRepository _hotelRepository;
        private readonly IMapper _mapper;

        public GetHotelByIdService(IHotelRepository hotelRepository
            , IMapper mapper)
        {
            _hotelRepository = hotelRepository;
            _mapper = mapper;
        }

        public async Task<HotelDto> GetByIdAsync(int id, CancellationToken cancellationToken = default)
        {
            var hotel = await _hotelRepository.GetByIdAsync(id, cancellationToken);
            return _mapper.Map<HotelDto>(hotel);
        }
    }
}
