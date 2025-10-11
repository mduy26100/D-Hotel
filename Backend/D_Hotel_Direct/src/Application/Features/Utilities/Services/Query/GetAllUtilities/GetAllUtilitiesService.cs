using Application.Features.Utilities.DTOs;
using Application.Features.Utilities.Interfaces.Services.Query.GetAllUtilities;
using Application.Features.Utilities.Repositories;
using AutoMapper;

namespace Application.Features.Utilities.Services.Query.GetAllUtilities
{
    public class GetAllUtilitiesService : IGetAllUtilitiesService
    {
        private readonly IUtilityRepository _utilityRepository;
        private readonly IUtilityItemRepository _utilityItemRepository;
        private readonly IMapper _mapper;

        public GetAllUtilitiesService(IUtilityRepository utilityRepository
            , IUtilityItemRepository utilityItemRepository
            , IMapper mapper)
        {
            _utilityRepository = utilityRepository;
            _utilityItemRepository = utilityItemRepository;
            _mapper = mapper;
        }

        public async Task<IEnumerable<UtilityDto>> GetAllAsync(CancellationToken cancellationToken = default)
        {
            var utilities = await _utilityRepository.GetAllAsync(cancellationToken);

            var allUtilityItems = await _utilityItemRepository.GetAllAsync(cancellationToken);
            var utilityDtos = _mapper.Map<IEnumerable<UtilityDto>>(utilities);

            foreach (var utilityDto in utilityDtos)
            {
                var items = allUtilityItems
                    .Where(item => item.UtilityId == utilityDto.Id)
                    .Select(item => item.Name)
                    .ToList();

                utilityDto.UtilityItems = items;
            }

            return utilityDtos;
        }
    }
}