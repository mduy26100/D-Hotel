using Application.Features.Hotels.DTOs;
using Application.Features.Hotels.Interfaces.Services.Query.GetAllHotelCategories;
using Application.Features.Hotels.Repositories;
using AutoMapper;

namespace Application.Features.Hotels.Services.Query.GetAllHotelCategories
{
    public class GetAllHotelCategoriesService : IGetAllHotelCategoriesService
    {
        private readonly IHotelCategoryRepository _hotelCategoryRepository;
        private readonly IMapper _mapper;

        public GetAllHotelCategoriesService(IHotelCategoryRepository hotelCategoryRepository
            , IMapper mapper)
        {
            _hotelCategoryRepository = hotelCategoryRepository;
            _mapper = mapper;
        }

        public async Task<IEnumerable<HotelCategoryDto>> GetAllAsync(CancellationToken cancellationToken = default)
        {
            var entities = await _hotelCategoryRepository.GetAllAsync(cancellationToken);
            return _mapper.Map<IEnumerable<HotelCategoryDto>>(entities);
        }
    }
}
