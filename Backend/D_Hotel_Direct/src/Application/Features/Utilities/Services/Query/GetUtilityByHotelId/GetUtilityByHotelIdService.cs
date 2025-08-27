using Application.Features.Utilities.DTOs;
using Application.Features.Utilities.Interfaces.Services.Query.GetUtilityByHotelId;
using Application.Features.Utilities.Repositories;
using AutoMapper;

namespace Application.Features.Utilities.Services.Query.GetUtilityByHotelId
{
    public class GetUtilityByHotelIdService : IGetUtilityByHotelIdService
    {
        private readonly IHotelUtilityRepository _hotelUtilityItemRepository;
        private readonly IMapper _mapper;

        public GetUtilityByHotelIdService(IHotelUtilityRepository hotelUtilityItemRepository
            , IMapper mapper)
        {
            _hotelUtilityItemRepository = hotelUtilityItemRepository;
            _mapper = mapper;
        }

        public Task<IEnumerable<HotelUtilityDto>> GetByIdAsync(int hotelId, CancellationToken cancellationToken = default)
        {
            var hotelUtilityItems = _hotelUtilityItemRepository.GetByHotelIdAsync(hotelId, cancellationToken);
            return _mapper.Map<Task<IEnumerable<HotelUtilityDto>>>(hotelUtilityItems);
        }
    }
}
