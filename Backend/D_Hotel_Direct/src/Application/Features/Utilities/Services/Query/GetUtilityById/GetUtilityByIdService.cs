using Application.Features.Utilities.DTOs;
using Application.Features.Utilities.Interfaces.Services.Query.GetUtilityById;
using Application.Features.Utilities.Repositories;
using AutoMapper;

namespace Application.Features.Utilities.Services.Query.GetUtilityById
{
    public class GetUtilityByIdService : IGetUtilityByIdService
    {
        private readonly IUtilityRepository _utilityRepository;
        private readonly IUtilityItemRepository _utilityItemRepository;
        private readonly IMapper _mapper;

        public GetUtilityByIdService(
            IUtilityRepository utilityRepository,
            IUtilityItemRepository utilityItemRepository,
            IMapper mapper)
        {
            _utilityRepository = utilityRepository;
            _utilityItemRepository = utilityItemRepository;
            _mapper = mapper;
        }

        public async Task<UtilityDto?> GetByIdAsync(int id, CancellationToken cancellationToken = default)
        {
            var utility = await _utilityRepository.GetByIdAsync(id, cancellationToken);
            if (utility == null)
                return null;

            var utilityItems = await _utilityItemRepository.FindAsync(h => h.UtilityId == utility.Id, cancellationToken);

            // 🔹 Map sang UtilityDto
            var utilityDto = _mapper.Map<UtilityDto>(utility);

            // 🔹 Map từng item sang UtilityItemDto thay vì string
            utilityDto.UtilityItems = utilityItems
                .Select(item => new UtilityItemDto
                {
                    Id = item.Id,
                    UtilityId = item.UtilityId,
                    Name = item.Name
                })
                .ToList();

            return utilityDto;
        }
    }
}
