using Application.Features.Utilities.DTOs;
using Application.Features.Utilities.Interfaces.Services.Query.GetUtilityItemsByUtilityId;
using Application.Features.Utilities.Repositories;
using AutoMapper;

namespace Application.Features.Utilities.Services.Query.GetUtilityItemsByUtilityId
{
    public class GetUtilityItemsByUtilityIdService : IGetUtilityItemsByUtilityIdService
    {
        private readonly IUtilityItemRepository _utilityItemRepository;
        private readonly IMapper _mapper;

        public GetUtilityItemsByUtilityIdService(IUtilityItemRepository utilityItemRepository
            , IMapper mapper)
        {
            _utilityItemRepository = utilityItemRepository;
            _mapper = mapper;
        }

        public async Task<IEnumerable<UtilityItemDto>> GetByUtilityIdAsync(int utilityId, CancellationToken cancellationToken = default)
        {
            var utilityItems = await _utilityItemRepository.FindAsync(h => h.UtilityId == utilityId, cancellationToken);
            return _mapper.Map<IEnumerable<UtilityItemDto>>(utilityItems);
        }
    }
}