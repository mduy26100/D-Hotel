using Application.Features.Purposes.DTOs;
using Application.Features.Purposes.Interfaces.Services.Query.HotelTravelPurpose.GetAllHotelTravelPurposes;
using Application.Features.Purposes.Repositories;
using AutoMapper;

namespace Application.Features.Purposes.Services.Query.HotelTravelPurpose.GetAllHotelTravelPurposes
{
    public class GetAllHotelTravelPurposesService : IGetAllHotelTravelPurposesService
    {
        private readonly IHotelTravelPurposeRepository _hotelTravelPurposeRepository;
        private readonly IMapper _mapper;

        public GetAllHotelTravelPurposesService(IHotelTravelPurposeRepository hotelTravelPurposeRepository
            , IMapper mapper)
        {
            _hotelTravelPurposeRepository = hotelTravelPurposeRepository;
            _mapper = mapper;
        }

        public async Task<IEnumerable<HotelTravelPurposeDto>> GetAllAsync(CancellationToken cancellationToken = default)
        {
            var list = await _hotelTravelPurposeRepository.GetAllAsync(cancellationToken);
            return _mapper.Map<IEnumerable<HotelTravelPurposeDto>>(list);
        }
    }
}
