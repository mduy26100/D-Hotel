using Application.Features.Utilities.DTOs;
using Application.Features.Utilities.Interfaces.Services.Query.GetAllUtilities;
using Application.Features.Utilities.Repositories;
using AutoMapper;

namespace Application.Features.Utilities.Services.Query.GetAllUtilities
{
    public class GetAllUtilitiesService : IGetAllUtilitiesService
    {
        private readonly IUtilityRepository _utilityRepository;
        private readonly IMapper _mapper;

        public GetAllUtilitiesService(IUtilityRepository utilityRepository
            , IMapper mapper)
        {
            _utilityRepository = utilityRepository;
            _mapper = mapper;
        }

        public async Task<IEnumerable<UtilityDto>> GetAllAsync(CancellationToken cancellationToken = default)
        {
            var utilities = await _utilityRepository.GetAllAsync(cancellationToken);
            return _mapper.Map<IEnumerable<UtilityDto>>(utilities);
        }
    }
}