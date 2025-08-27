using Application.Features.Hotels.DTOs;
using Application.Features.Hotels.Interfaces.Services.Query.GetHotelCategoryById;
using Application.Features.Hotels.Repositories;
using AutoMapper;

namespace Application.Features.Hotels.Services.Query.GetHotelsByCategoryId
{
    public class GetHotelsByCategoryIdService : IGetHotelsByCategoryIdService
    {
        private readonly IHotelRepository _hotelRepository;
        private readonly IMapper _mapper;

        public GetHotelsByCategoryIdService(IHotelRepository hotelRepository
            , IMapper mapper)
        {
            _hotelRepository = hotelRepository;
            _mapper = mapper;
        }

        public async Task<IEnumerable<HotelDto>> GetHotelsByCategoryIdAsync(int categoryId, CancellationToken cancellationToken = default)
        {
            var hotels = await _hotelRepository.GetByCategoryIdAsync(categoryId, cancellationToken);
            return _mapper.Map<IEnumerable<HotelDto>>(hotels);
        }
    }
}
