using Application.Features.Hotels.DTOs;
using Application.Features.Hotels.Interfaces.Services.Query.GetHotelCategoryById;
using Application.Features.Hotels.Repositories;
using AutoMapper;

namespace Application.Features.Hotels.Services.Query.GetHotelCategoryById
{
    public class GetHotelCategoryByIdService : IGetHotelCategoryByIdService
    {
        private readonly IHotelCategoryRepository _hotelCategoryRepository;
        private readonly IMapper _mapper;

        public GetHotelCategoryByIdService(IHotelCategoryRepository hotelCategoryRepository
            , IMapper mapper)
        {
            _hotelCategoryRepository = hotelCategoryRepository;
            _mapper = mapper;
        }

        public async Task<HotelCategoryDto> GetByIdAsync(int id, CancellationToken cancellationToken = default)
        {
            var entity = await _hotelCategoryRepository.GetByIdAsync(id, cancellationToken);
            return _mapper.Map<HotelCategoryDto>(entity);
        }
    }
}
