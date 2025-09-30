using Application.Features.Purposes.DTOs;
using Application.Features.Purposes.Interfaces.Services.Query.TravelPurpose.GetAllTravelPurposes;
using Application.Features.Purposes.Repositories;
using AutoMapper;

namespace Application.Features.Purposes.Services.Query.TravelPurpose.GetAllTravelPurposes
{
    public class GetAllTravelPurposesService : IGetAllTravelPurposesService
    {
        private readonly ITravelPurposeRepository _travelPurposeRepository;
        private readonly IMapper _mapper;

        public GetAllTravelPurposesService(ITravelPurposeRepository travelPurposeRepository
            , IMapper mapper)
        {
            _travelPurposeRepository = travelPurposeRepository;
            _mapper = mapper;
        }

        public async Task<IEnumerable<TravelPurposeDto>> GetAllAsync(CancellationToken cancellationToken = default)
        {
            var list = await _travelPurposeRepository.GetAllAsync(cancellationToken);
            return _mapper.Map<IEnumerable<TravelPurposeDto>>(list);
        }
    }
}
